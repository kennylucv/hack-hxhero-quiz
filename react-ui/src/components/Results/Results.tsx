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

  return (
    <div>
      <h1>Here are your answers</h1>
      <div>
        {props.answers.map((answer) => (
          <div key={answer.answer}>{answer.answer}</div>
        ))}
      </div>
      <button onClick={props.onStartOver}> Start Over </button>
    </div>
  );
};

export default Results;
