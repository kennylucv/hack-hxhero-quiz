import { Heading, PrimaryButton } from "@homex/hx-component-library";
import React from "react";
import { colours } from "../../constants/styles";
import {
  CloudLeftContainer,
  CloudRightContainer,
  IntroContent,
  SubHeadingStyled,
} from "./IntroStyled";

import CloudLeft from "../../assets/CloudLeft.svg";
import CloudRight from "../../assets/CloudRight.svg";
import { Page } from "../genericsStyled";
import GraphicFooter from "../GraphicFooter/GraphicFooter";

interface IIntroProps {
  onClickStart: () => void;
}

const strings = {
  headerText: "What Kind of Home Hero Are You?",
  bodyText:
    "When it comes to taking care of your home, do you roll up your sleeves and do the dirty work? Ramble off questions? Or do you prefer to sit back and leave it to the pros? Find out what kind of Home Hero you are.",
  ctaText: "Start Quiz",
};

const Intro = (props: IIntroProps): JSX.Element => {
  return (
    <Page>
      <IntroContent>
        <Heading $fontColor={colours.prime600} $textAlign="center">
          {strings.headerText}
        </Heading>
        <SubHeadingStyled
          $fontColor={colours.black}
          $fontSize="s"
          $textAlign="center"
        >
          {strings.bodyText}
        </SubHeadingStyled>
        <PrimaryButton btnSize="m" btnType="solid" onClick={props.onClickStart}>
          {strings.ctaText}
        </PrimaryButton>
      </IntroContent>
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

export default Intro;
