import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import configureDb from './configure/configureDb.js';
import { scoreAnswers, normalizeScores } from './lib/scoreAnswers.js';
import classify from './lib/archetypes.js';

import SessionResults from './models/SessionResults.js';
import Questions from './models/Questions.js';
import QuestionAnswers from './models/QuestionAnswers.js';

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
// const numCPUs = os.cpus().length;

const App = () => {

  // // Multi-process to utilize all CPU cores.
  // if (!isDev && cluster.isMaster) {
  //   console.error(`Node cluster master ${process.pid} is running`);

  //     // Fork workers.
  //   for (let i = 0; i < numCPUs; i++) {
  //     cluster.fork();
  //   }

  //   cluster.on('exit', (worker, code, signal) => {
  //     console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  //   });

  // } else {
    configureDb();
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
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

    const submitAnswers = async (req, res) => {
      res.set('Content-Type', 'application/json');

      const sessionId = req.body.sessionId;

      if (!sessionId) {
        res.send("Error, sessionId required!");
      }

      const scores = await scoreAnswers(req.body.answers)
      const archetype = classify(scores)
      const normedScores = normalizeScores(scores)
      
      console.log(scores)
      console.log(archetype)
      console.log(normedScores)

      SessionResults.findByIdAndUpdate(
        sessionId,
        {
          $set: {
            submittedAt: new Date(),
            answers: req.body.answers,
            archetype: archetype,
            scores: normedScores
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

    const getSession = async (req, res) => {
      res.set('Content-Type', 'application/json');
      const sessionId = req.params.id;
      
      if (!sessionId) {
        res.send("Cannot find sessionId");
      }
      
      const session = (await SessionResults.findById(sessionId))._doc;
      res.json({session});
    }

    const getPieData = async (req, res) => {

      let archetypes = {
        diyer: 0,
        ponderer: 0,
        workarounder: 0,
        boss: 0
      }

      const sessions = await SessionResults.find();
      for (const session of sessions) {
        if ( session._doc.archetype ) {
          archetypes[session._doc.archetype] += 1
        }
      }

      res.json({ pieData: archetypes});
    };
    
    const getAnswerPercent = async (req, res) => {
      res.set('Content-Type', 'application/json');
      const questionId = req.body.questionId;
      const archetype = req.body.archetype;
      
      if (!archetype) {
        res.send("archeype required");
      }

      if (!questionId) {
        res.send("questionId required");
      }

      console.log({archetype});
      
      const sessionsQ = (await SessionResults.find({ archetype }));

      // console.log(sess)

      if (sessionsQ.lengh === 0) {
      }

      let sessionsAnswerIdsForQuestion = []
      const results = {};

      for (const session of sessionsQ) {
        const answers = session._doc.answers.filter((answer) => answer.questionId === questionId);
        for (const answer of answers) {
          const answerId = answer.answerId;
          if (!results[answerId]) {
            results[answerId] = 1;
            sessionsAnswerIdsForQuestion.push(answerId)
          } else {
            results[answerId] += 1; 
          }
        }
      }

      let answersCollection = []

      for (const answerId of sessionsAnswerIdsForQuestion) {
        const answer = (await QuestionAnswers.findById(answerId))._doc;
        answersCollection.push(answer);
      }

      res.json({ results, answers: answersCollection });
    }

    app.listen(PORT, function () {
      console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });

    // POSTS
    app.post('/api/import-questions', jsonParser, importQuestions);
    app.post('/api/start-session', startSession)
    app.post('/api/get-answer-percent', jsonParser, getAnswerPercent)

    // PUT
    app.put('/api/submit-answers', jsonParser, submitAnswers);

    // GET
    app.get('/api/questions', getQuestions);
    app.get('/api/get-session/:id', jsonParser, getSession);
    app.get('/api/get-pieData', getPieData);

      // All remaining requests return the React app, so it can handle routing.
    app.get('*', function(request, response) {
      response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
  // }
}

App();
