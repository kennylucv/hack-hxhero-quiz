/* eslint-disable @typescript-eslint/no-unused-vars */
import { createTheme, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import getQuizData from "./api/getQuizData";
import submitAnswers from "./api/submitAnswers";
import "./App.css";
import Intro from "./components/Intro/Intro";
import Quiz from "./components/Quiz/Quiz";
import Results from "./components/Results/Results";
import { colours } from "./constants/styles";
import {
  IAnswer,
  IQuizData,
  ISubmitAnswers,
  QuizState,
} from "./interfaces/quiz";

const App = (): JSX.Element => {
  const [quizState, setQuizState] = useState(QuizState.intro);
  const [results, setResults] = useState<IAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<IQuizData | undefined>(undefined);

  const resetApp = () => {
    setQuizState(QuizState.intro);
    setResults([]);
  };

  const handleQuizState = async () => {
    switch (quizState) {
      case QuizState.intro:
        setQuizState(QuizState.quiz);
        break;
      case QuizState.quiz:
        setQuizState(QuizState.results);
        break;
      default:
        resetApp();
    }
  };

  const handleAddResult = (newResults: IAnswer[]) => {
    setResults(newResults);
  };

  const handleSubmitAnswers = async (results: IAnswer[]) => {
    const submitReqBody: ISubmitAnswers = {
      answers: results.map((answer) => ({
        answerId: answer.id,
      })),
    };
    await submitAnswers(submitReqBody);
  };

  const handleFinishQuiz = async (results: IAnswer[]) => {
    await handleSubmitAnswers(results);
    handleQuizState();
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: colours.greenBright,
      },
    },
  });

  useEffect(() => {
    if (!quizData) {
      getQuizData().then((data) => {
        setQuizData(data);
      });
    }

    return;
  }, [quizData]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {quizState === QuizState.intro && (
          <Intro onClickStart={handleQuizState} />
        )}
        {quizState === QuizState.quiz && quizData && (
          <Quiz
            quizData={quizData}
            onFinishQuiz={(results) => handleFinishQuiz(results)}
            setResults={handleAddResult}
            currentResults={results}
          />
        )}
        {quizState === QuizState.results && (
          <Results answers={results} onStartOver={handleQuizState} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
