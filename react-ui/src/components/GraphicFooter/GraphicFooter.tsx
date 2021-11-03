import React from "react";
import { FooterImageContainer } from "./GraphicFooterStyled";
import { IsMediumAndAbove, IsMediumAndBelow, IsSmallAndAbove } from "../shared/media";

import IntroGraphic from "../../assets/introGraphic.svg";
import IntroGraphicMobile from "../../assets/introGraphicMobile.svg";
import Fence from "../../assets/Fence.svg";

const GraphicFooter = (): JSX.Element => {
  return (
    <>
      <FooterImageContainer>
        <img src={Fence} alt="Fence" />
        <img src={Fence} alt="Fence" />
      </FooterImageContainer>
      <IsMediumAndBelow>
        <FooterImageContainer>
          <img src={IntroGraphicMobile} alt="Intro Graphic" />
        </FooterImageContainer>
      </IsMediumAndBelow>
      <IsMediumAndAbove>
        <FooterImageContainer>
          <img src={IntroGraphic} alt="Intro Graphic" />
        </FooterImageContainer>
      </IsMediumAndAbove>
    </>
  );
};

export default GraphicFooter;
