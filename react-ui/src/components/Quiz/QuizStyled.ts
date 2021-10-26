import { MEDIA_QUERIES, PrimaryButton, Subheading, theme} from "@homex/hx-component-library";
import styled from "styled-components";
import { QuestionType } from "../../interfaces/quiz";

export const IntroPage = styled.div``;

export const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 335px;
  min-height: 449px;
  background: #ffffff;
  border: 1px solid #d4eef5;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 10;
  ${MEDIA_QUERIES.medium} {
    width: 800px;
    min-height: 430px;
  }
`;

export const QuizHeaderContainer = styled.div`
  padding: ${theme.spacing.mobile[100]} ${theme.spacing.mobile[200]};
  ${MEDIA_QUERIES.medium}{
    padding: 18px 40px;
  }
`;

interface IQuizMainContainerProps {
  type: QuestionType;
}

export const QuizMainContainer = styled.div<IQuizMainContainerProps>`
  padding: ${theme.spacing.mobile[100]} ${theme.spacing.mobile[300]};
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
  ${MEDIA_QUERIES.medium} {
    padding: ${theme.spacing.desktop[100]} ${theme.spacing.desktop[600]};
  }
`;

export const QuizFooterContainer = styled.div`
  padding: ${theme.spacing.mobile[100]} ${theme.spacing.mobile[300]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${MEDIA_QUERIES.medium} {
    padding: ${theme.spacing.desktop[100]} ${theme.spacing.desktop[600]};
  }
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

export const PrimaryButtonStyled = styled(PrimaryButton)`
  padding: ${theme.spacing.mobile[100]} ${theme.spacing.mobile[300]};
  font-size: ${theme.fonts.scale.mobile[25]};
  
  ${MEDIA_QUERIES.medium}{
    font-size: ${theme.fonts.scale.desktop[75]};
    padding: ${theme.spacing.desktop[100]} ${theme.spacing.desktop[300]}
  }
`;