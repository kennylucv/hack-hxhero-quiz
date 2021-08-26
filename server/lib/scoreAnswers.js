import QuestionAnswers from '../models/QuestionAnswers.js';

async function scoreAnswers(answers) {

  let scores = {
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

function normalizeScores(scores) {

  const groupings = {
    knowledge: {
      10: 4,
      8: 3,
      5: 2,
      3: 1,
      0: 0
    },
    action: {
      15: 4,
      13: 3,
      9: 2,
      5: 1,
      0: 0
    },
    risk: {
      10: 4,
      9: 3,
      8: 2,
      3: 1,
      0: 0
    },
    price: {
      5: 0,
      2: 1,
      1: 3,
      0: 4
    }
  }

  let normedScores = {}
  for (const feature in scores) {
    for (const cutoff in groupings[feature]) {
      if ( scores[feature] >= cutoff ) {
        if ((normedScores[feature] === undefined ) || (normedScores[feature] < groupings[feature][cutoff])) {
          normedScores[feature] = groupings[feature][cutoff];
        }
      }
    }
  }
  // special case where price is inverse of all the other options and is a one-one mapping
  normedScores['price'] = groupings['price'][scores['price']]
  return normedScores
}

export {scoreAnswers, normalizeScores}
