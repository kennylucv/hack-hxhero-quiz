import React from "react";
import { FooterImageContainer } from "./GraphicFooterStyled";

import IntroGraphic from "../../assets/introGraphic.svg";
import Fence from "../../assets/Fence.svg";

const GraphicFooter = (): JSX.Element => {
  return (
    <>
      <FooterImageContainer>
        <img src={Fence} alt="Fence" />
        <img src={Fence} alt="Fence" />
      </FooterImageContainer>
      <FooterImageContainer>
        <img src={IntroGraphic} alt="Intro Graphic" />
      </FooterImageContainer>
    </>
  );
};

export default GraphicFooter;
