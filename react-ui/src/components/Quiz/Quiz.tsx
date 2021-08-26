import React, { useEffect, useState } from "react";
import { IAnswer, IQuizData, QuestionType } from "../../interfaces/quiz";
import { Page } from "../genericsStyled";
import { CloudLeftContainer, CloudRightContainer } from "../Intro/IntroStyled";

import CloudLeft from "../../assets/CloudLeft.svg";
import CloudRight from "../../assets/CloudRight.svg";
import GraphicFooter from "../GraphicFooter/GraphicFooter";
import {
  QuizContent,
  QuizFooterContainer,
  QuizHeaderContainer,
  QuizMainContainer,
} from "./QuizStyled";
import { Heading, Paragraph, PrimaryButton } from "@homex/hx-component-library";
import { colours } from "../../constants/styles";
import { LinearProgress } from "@material-ui/core";
import AnswerListItem from "../AnswerListItem/AnswerListItem";
import AnswerCard from "../AnswerCard/AnswerCard";

interface IIntroProps {
  quizData: IQuizData;
  onFinishQuiz: (results: IAnswer[]) => void;
  currentResults: IAnswer[];
  setResults: (results: IAnswer[]) => void;
}

const strings = {
  buttonNext: "Next",
  buttonBack: "Back",
};

const Quiz = (props: IIntroProps): JSX.Element => {
  const questions = props.quizData.questions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | undefined>(
    undefined
  );
  const { currentResults } = props;

  const currentQuestion = questions[questionIndex];

  const onClickNext = async () => {
    if (!selectedAnswer) {
      return;
    }

    let newResults: IAnswer[] = [];

    // if we already have a result for this current question, find and replace it
    if (currentResults.length - 1 >= questionIndex) {
      const oldResults = [...currentResults];
      newResults = oldResults.splice(questionIndex, 1, selectedAnswer);
      props.setResults(newResults);
    } else {
      newResults = [...currentResults, selectedAnswer];
      props.setResults(newResults);
    }

    if (questionIndex === questions.length - 1) {
      // last questions
      props.onFinishQuiz(newResults);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
    setSelectedAnswer(undefined);
  };

  useEffect(() => {
    const hasResultsForQuestion = currentResults.length - 1 >= questionIndex;

    if (hasResultsForQuestion) {
      setSelectedAnswer(currentResults[questionIndex]);
    }
  }, [questionIndex, currentResults]);

  // eslint-disable-next-line prettier/prettier
  const progressValue = (questionIndex + 1) / questions.length * 100;

  const questionProgressDiscription = `Question ${questionIndex + 1}/${
    questions.length
  }`.toUpperCase();

  console.log("currentQ", currentQuestion);
  console.log(selectedAnswer);

  return (
    <Page>
      <QuizContent>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          style={{ backgroundColor: colours.progressGray }}
        />
        <QuizHeaderContainer>
          <Paragraph
            $fontSize="xxs"
            $fontWeight="bold"
            $fontColor={colours.neutral400}
          >
            {questionProgressDiscription}
          </Paragraph>
          <Heading
            $fontSize="xxs"
            $fontWeight="regular"
            $fontColor={colours.neutral700}
          >
            {currentQuestion.question}
          </Heading>
        </QuizHeaderContainer>
        <QuizMainContainer type={currentQuestion.type}>
          {currentQuestion.answers.map((answer) => {
            const isSelected = selectedAnswer
              ? selectedAnswer.id === answer.id
              : false;
            if (currentQuestion.type === QuestionType.list) {
              return (
                <AnswerListItem
                  key={answer.id}
                  text={answer.answer}
                  isSelected={isSelected}
                  onClick={() => setSelectedAnswer(answer)}
                />
              );
            } else {
              return (
                <AnswerCard
                  key={answer.id}
                  text={answer.answer}
                  isSelected={isSelected}
                  imgUrl={answer.imgUrl}
                  onClick={() => setSelectedAnswer(answer)}
                />
              );
            }
          })}
        </QuizMainContainer>
        <QuizFooterContainer>
          <PrimaryButton
            disabled={questionIndex === 0}
            btnSize="xs"
            btnType="outline"
            onClick={() => setQuestionIndex(questionIndex - 1)}
          >
            {strings.buttonBack}
          </PrimaryButton>
          <PrimaryButton
            btnSize="xs"
            btnType="solid"
            onClick={onClickNext}
            disabled={!selectedAnswer}
          >
            {strings.buttonNext}
          </PrimaryButton>
        </QuizFooterContainer>
      </QuizContent>
      <CloudLeftContainer>
        <img src={CloudLeft} alt="CloudLeft" />
      </CloudLeftContainer>
      <CloudRightContainer>
        <img src={CloudRight} alt="CloudRight" />
      </CloudRightContainer>
      <GraphicFooter />
    </Page>
  );
};

export default Quiz;
