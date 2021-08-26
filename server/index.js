import express from 'express';
import { isMaster } from 'cluster';
import configureDb from './configure/configureDb.js';
import bodyParser from 'body-parser';

import SessionResults from './models/SessionResults.js';
import Questions from './models/Questions.js';
import QuestionAnswers from './models/QuestionAnswers.js';

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const App = () => {

  // Multi-process to utilize all CPU cores.
  if (!isDev && isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

  } else {
    configureDb();
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }))
    const jsonParser = bodyParser.json()

    const startSession = async (req, res) => {
      res.set('Content-Type', 'application/json');

      const newSession = new SessionResults({
        createdAt: new Date(),
      })

      newSession.save(function (error, document) {
        if (error) console.error(error)
        res.json({ sessionId: document._id });
      })
    };

    const submitAnswers = (req, res) => {
      res.set('Content-Type', 'application/json');

      const sessionId = req.body.sessionId;

      if (!sessionId) {
        res.send("Error, sessionId required!");
      }

      SessionResults.findByIdAndUpdate(
        sessionId,
        {
          $set: {
            submittedAt: new Date(),
            answers: req.body.answers,
          }
        },
        {},
        (err, doc) => {
          res.json(doc);
        } 
      )
      
    };

    const importQuestions = async (req, res) => {
      res.set('Content-Type', 'application/json');

      if (!req.body.questions) {
        res.send("Error, questions required!");
      }

      Questions.collection.drop();
      QuestionAnswers.collection.drop();

      const savedQuestions = [];
      const savedAnswers = [];

      for (const questionInput of req.body.questions) {
        const {question, type, answers} = questionInput;
        if (!question) {
          res.send("Error with question input!");
        }

        // add questions
        const newQuestion = new Questions({
          question,
          type,
          order: 0,
          isActive: true,
        });

        // add answers
        const savedQuestion = await newQuestion.save();
        savedQuestions.push(savedQuestion);

        for (const answerInput of answers) {
          const {answer, points, imgUrl} = answerInput;
          if (!answerInput) {
            res.send("Error with answerInput");
          }

          const newAnswer = new QuestionAnswers({
            questionId: savedQuestion._id,
            answer,
            imgUrl,
            points,
          });

          const savedAnswer = await newAnswer.save();
          savedAnswers.push(savedAnswer);
        }
      }

      res.json({
        questions: savedQuestions,
        answers: savedAnswers,
      });
    }

    const getQuestions = async (req, res) => {
      const questions = await Questions.find();
      // const answers = await QuestionAnswers.findOne({ questionId: questions[0]._doc._id });

      if (!questions || questions.lengh === 0) {
        res.send("Cannot find any questions");
      }

      const questionResponses = [];
      const answerResponses = [];

      // find questionAnswers
      for (const question of questions) {
        const { _id: questionId } = question._doc;

        const questionAnswers = await QuestionAnswers.find({ questionId });

        const questionRes = {
          ...question._doc,
          answers: questionAnswers.map((qAnswer) => {
            const {_id, ...rest} = qAnswer._doc;
            return { id: _id, ...rest};
          }),
        };

        questionResponses.push(questionRes);
      }

      res.json({ questions: questionResponses});
    }

    app.listen(PORT, function () {
      console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });

    // POSTS
    app.post('/api/import-questions', jsonParser, importQuestions);
    app.post('/api/start-session', startSession)

    // GET
    app.get('/api/questions', getQuestions);

    // PUT
    app.put('/api/submit-answers', jsonParser, submitAnswers);
  }
}

App();
