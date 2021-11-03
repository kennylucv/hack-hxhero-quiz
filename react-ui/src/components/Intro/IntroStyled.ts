import { MEDIA_QUERIES, Subheading, theme } from "@homex/hx-component-library";
import styled from "styled-components";

export const IntroPage = styled.div``;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: ${theme.spacing.mobile[100]};
    width: 95%;
    z-index: 10;
  }

  button {
    margin-top: ${theme.spacing.mobile[300]};
    z-index: 10;
  }

  ${MEDIA_QUERIES.medium}{
    h1 {
      margin-bottom: ${theme.spacing.desktop[100]};
      z-index: 10;
    }

    button {
      margin-top: ${theme.spacing.desktop[300]};
      z-index: 10;
    }
  }

  z-index: 100;
`;

export const SubHeadingStyled = styled(Subheading)`
  margin-bottom: ${theme.spacing.mobile[100]};
  width: 95%;
  ${MEDIA_QUERIES.medium}{
    width: 75%;
    margin-bottom: ${theme.spacing.desktop[100]};
  }
`;

export const CloudLeftContainer = styled.div`
  left: 0%;
  position: absolute;
  top: 60%;
  z-index: 1;
  ${MEDIA_QUERIES.medium}{
    left: 0%;
    top: 10%;
  }
`;

export const CloudRightDesktopContainer = styled.div`
  position: absolute;
  right: 5%;
  top: 10%;
  z-index: 1;
`;

export const CloudRightMobileContainer = styled.div`
  position: absolute;
  right: 0%;
  top: 5%;
  z-index: 1;
`;
