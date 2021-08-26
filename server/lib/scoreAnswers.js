import QuestionAnswers from '../models/QuestionAnswers.js';

async function scoreAnswers(answers) {

  var scores = {
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
      7: 3,
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
      5: 4,
      2: 3,
      1: 1,
      0: 0
    }
  }

  for (const feature in scores) {
    for (const cutoff in groupings[feature]) {
      if ( scores[feature] >= cutoff ) {
        scores[feature] = groupings[feature][cutoff]
        break;
      }
    }
  }
  return scores
}

export {scoreAnswers, normalizeScores}
