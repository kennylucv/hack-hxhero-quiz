import { colours } from "./../../constants/styles";
import styled from "styled-components";

interface IAnswerCardProps {
  isSelected: boolean;
  onClick?: () => void;
}

export const AnswerCardContainer = styled.div<IAnswerCardProps>`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  border-radius: 4px;
  width: 162px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? colours.prime600 : colours.tertiary200)};

  :last-child {
    margin-right: 0px;
  }
`;

export const AnswerCardImageContainer = styled.div`
  height: 126px;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const AnswerCardTextContainer = styled.div<IAnswerCardProps>`
  padding: 14px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isSelected }) =>
    isSelected ? colours.prime600 : colours.transparent};
`;
