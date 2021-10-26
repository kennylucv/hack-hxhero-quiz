import { colours } from "./../../constants/styles";
import styled from "styled-components";
import { MEDIA_QUERIES, theme } from "@homex/hx-component-library";

interface IAnswerCardProps {
  isSelected: boolean;
  onClick?: () => void;
}

export const AnswerCardContainer = styled.div<IAnswerCardProps>`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  border-radius: 4px;
  width: 139.5px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? colours.prime600 : colours.tertiary200)};

  ${MEDIA_QUERIES.medium}{
    width: 162px;
  }

  :last-child {
    margin-right: 0px;
  }
`;

export const AnswerCardImageContainer = styled.div`
  height: 108.5px;
  width: 100%;

  ${MEDIA_QUERIES.medium}{
    height: 126px;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export const AnswerCardTextContainer = styled.div<IAnswerCardProps>`
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isSelected }) =>
    isSelected ? colours.prime600 : colours.transparent};

  ${MEDIA_QUERIES.medium}{
    padding: 14px;
  }
`;
