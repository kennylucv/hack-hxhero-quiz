import { Paragraph } from "@homex/hx-component-library";
import { Radio } from "@material-ui/core";
import React from "react";
import { colours } from "../../constants/styles";
import { AnswerListItemContainer } from "./AnswerListItemStyled";

export interface IAnswerListItemProps {
  isSelected: boolean;
  text: string;
  onClick: () => void;
}

const AnswerListItem = (props: IAnswerListItemProps): JSX.Element => {
  const { isSelected, text, onClick } = props;
  return (
    <AnswerListItemContainer onClick={onClick}>
      <Radio checked={isSelected} name={text} value={text} />
      <Paragraph
        $fontSize="xxs"
        $fontWeight="regular"
        $fontColor={colours.neutral600}
        $textAlign="left"
      >
        {text}
      </Paragraph>
    </AnswerListItemContainer>
  );
};

export default AnswerListItem;
