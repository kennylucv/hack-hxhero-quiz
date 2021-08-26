import { Subheading } from "@homex/hx-component-library";
import styled from "styled-components";
import { QuestionType } from "../../interfaces/quiz";

export const IntroPage = styled.div``;

export const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  min-height: 430px;
  background: #ffffff;
  border: 1px solid #d4eef5;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 10;
`;

export const QuizHeaderContainer = styled.div`
  padding: 18px 40px;
`;

interface IQuizMainContainerProps {
  type: QuestionType;
}

export const QuizMainContainer = styled.div<IQuizMainContainerProps>`
  padding: 18px 40px;
  flex: 1;
  align-items: center;
  border-top: 1px solid #d4eef5;
  border-bottom: 1px solid #d4eef5;
  display: flex;
  ${({ type }) =>
    type === QuestionType.list
      ? `
    flex-direction: column;
  `
      : `
    justify-content: space-evenly;
      `}
  align-items: flex-start;
`;

export const QuizFooterContainer = styled.div`
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubHeadingStyled = styled(Subheading)`
  margin-bottom: 16px;
  width: 75%;
`;

export const CloudLeftContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 1;
`;

export const CloudRightContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  z-index: 1;
`;
