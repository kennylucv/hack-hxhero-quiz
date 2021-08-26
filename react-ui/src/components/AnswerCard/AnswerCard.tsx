import { Heading } from "@homex/hx-component-library";
import React from "react";
import { colours } from "../../constants/styles";
import {
  AnswerCardContainer,
  AnswerCardImageContainer,
  AnswerCardTextContainer,
} from "./AnswerCardStyled";

export interface IAnswerCardProps {
  isSelected: boolean;
  text: string;
  onClick: () => void;
  imgUrl?: string;
}

const AnswerCard = (props: IAnswerCardProps): JSX.Element => {
  const { isSelected, text, onClick, imgUrl } = props;
  return (
    <AnswerCardContainer isSelected={isSelected} onClick={onClick}>
      {imgUrl && (
        <AnswerCardImageContainer>
          <img src={imgUrl} />
        </AnswerCardImageContainer>
      )}
      <AnswerCardTextContainer isSelected={isSelected}>
        <Heading
          $fontSize="xxs"
          $fontWeight="regular"
          $fontColor={isSelected ? colours.common100 : colours.neutral600}
          $textAlign="center"
        >
          {text}
        </Heading>
      </AnswerCardTextContainer>
    </AnswerCardContainer>
  );
};

export default AnswerCard;
