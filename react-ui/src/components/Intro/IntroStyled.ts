import { Subheading } from "@homex/hx-component-library";
import styled from "styled-components";

export const IntroPage = styled.div``;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 16px;
    z-index: 10;
  }

  button {
    margin-top: 30px;
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
  left: 5%;
  z-index: 1;
`;
