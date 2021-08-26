import React from "react";
import { Archetype, IAnswer } from "../../interfaces/quiz";

interface IResultsProps {
  answers: IAnswer[];
  onStartOver: () => void;
}

interface ITalliedResults {
  diyer: number;
  prepper: number;
  investigator: number;
  boss: number;
  workarounder: number;
  type: Archetype;
}

const Results = (props: IResultsProps): JSX.Element => {
  const calculateArchetype = () => {
    const tally: any = {};
    props.answers.forEach((answer) => {
      answer.points.forEach((archetype) => {
        if (tally[archetype.archetype]) {
          tally[archetype.archetype] += archetype.amount;
        } else {
          tally[archetype.archetype] = archetype.amount;
        }
      });
    });
    console.log(tally);
    return tally;
  };

  return (
    <div>
      <h1>Here are your answers</h1>
      <div>
        {props.answers.map((answer) => (
          <div key={answer.answer}>{answer.answer}</div>
        ))}
      </div>
      <p>{calculateArchetype().toString()}</p>
      <button onClick={props.onStartOver}> Start Over </button>
    </div>
  );
};

export default Results;
