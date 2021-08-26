import express from 'express';
import { isMaster } from 'cluster';
import configureDb from './configure/configureDb.js';
import bodyParser from 'body-parser';

import Answers from './models/Answers.js';
import Questions from './models/Questions.js';
import QuestionAnswers from './models/QuestionAnswers.js';

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const App = () => {

  // Multi-process to utilize all CPU cores.
  if (!isDev && isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // on('exit', (worker, code, signal) => {
    //   console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    // });

  } else {
    configureDb();
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }))
    const jsonParser = bodyParser.json()

    const addAnswers = (req, res) => {
      res.set('Content-Type', 'application/json');

      const newAnswers = new Answers({
        timestamp: new Date(),
        answers: req.body.answers
      })

      newAnswers.save(function (error, document) {
        if (error) console.error(error)
        res.json(document);
      })
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
          if (!answerInput || !points) {
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
            const {questionId, _id, ...rest} = qAnswer._doc;
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
    app.post('/api/answers', jsonParser, addAnswers);
    app.post('/api/import-questions', jsonParser, importQuestions);

    // GET
    app.get('/api/questions', getQuestions);
  }
}



App();
