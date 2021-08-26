import QuestionAnswers from '../models/QuestionAnswers.js';

export default async function scoreAnswers(answers) {

  const scores = {
    action:0,
    knowledge:0,
    risk:0, 
    price:0
  }

  for (const answer of answers) {
    const QA = await QuestionAnswers.findById(answer.answerId)
    if (QA._doc.points) {
      for (const feature in QA._doc.points) {
        scores[feature] += QA._doc.points[feature]
      }
    }
  };

  return scores
}