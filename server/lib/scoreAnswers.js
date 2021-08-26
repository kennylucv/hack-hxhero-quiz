import QuestionAnswers from '../models/QuestionAnswers.js';

export default async function scoreAnswers(answers) {

  const scores = {
    action:0,
    knowledge:0,
    risk:0, 
    price:0
  }

  console.log(answers)

  for (const answer of answers) {
    console.log(answer.answerId)
    const QA = await QuestionAnswers.findById(answer.answerId)
    console.log(QA._doc)
    if (QA._doc.points) {
      for (const feature of QA._doc.points) {
        scores[feature] += QA._doc.points[feature]
      }
    }
  };

  return scores
}