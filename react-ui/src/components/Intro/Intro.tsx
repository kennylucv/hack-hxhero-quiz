import { Heading, PrimaryButton } from "@homex/hx-component-library";
import React from "react";
import { colours } from "../../constants/styles";
import {
  CloudLeftContainer,
  CloudRightDesktopContainer,
  CloudRightMobileContainer,
  IntroContent,
  SubHeadingStyled,
} from "./IntroStyled";
import { IsMediumAndAbove, IsMediumAndBelow } from "../shared/media";

import CloudLeft from "../../assets/CloudLeft.svg";
import CloudRight from "../../assets/CloudRight.svg";
import CloudRightMobile from "../../assets/CloudRightMobile.svg";
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
      <IsMediumAndAbove>
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
      </IsMediumAndAbove>
      <IsMediumAndBelow>
        <IntroContent>
          <Heading $fontColor={colours.prime600} $fontSize='m' $textAlign="center">
              {strings.headerText}
            </Heading>
            <SubHeadingStyled
              $fontColor={colours.black}
              $fontSize="xxs"
              $textAlign="center"
            >
              {strings.bodyText}
            </SubHeadingStyled>
            <PrimaryButton btnSize="xs" btnType="solid" onClick={props.onClickStart}>
              {strings.ctaText}
            </PrimaryButton>
        </IntroContent>
      </IsMediumAndBelow>
      <CloudLeftContainer>
        <img src={CloudLeft} alt="CloudLeft" />
      </CloudLeftContainer>
      <IsMediumAndAbove>
        <CloudRightDesktopContainer>
          <img src={CloudRight} alt="CloudRight" />
        </CloudRightDesktopContainer>
      </IsMediumAndAbove>
      <IsMediumAndBelow>
        <CloudRightMobileContainer>
          <img src={CloudRightMobile} alt="CloudRight" />
        </CloudRightMobileContainer>
      </IsMediumAndBelow>
      <GraphicFooter />
    </Page>
  );
};

export default Intro;
