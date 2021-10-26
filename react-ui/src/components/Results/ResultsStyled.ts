import styled from "styled-components";
import { colours } from "../../constants/styles";
import { Archetype } from "../../interfaces/quiz";
import { Page } from "../genericsStyled";
import { MEDIA_QUERIES, SecondaryButton, theme } from "@homex/hx-component-library";

export const ResutlsPage = styled(Page)`
  position: relative;
`;

export const ResultsContent = styled.div`
  margin: 190px 0px ${theme.spacing.mobile[700]} 0px;
  padding: ${theme.spacing.mobile[400]} ${theme.spacing.mobile[100]};

  display: flex;
  flex-direction: column;
  max-width: 335px;

  background: #ffffff;
  border: 1px solid #d4eef5;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 10;
  position: relative;

  ${MEDIA_QUERIES.medium}{
    margin: 0px 0px 100px 0px;
    max-width: 844px;
    min-height: 430px;
    padding: 54px 128px;
  }

`;

export const ResultsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 10px;
    width: 100%;
  }
`;

export const CharacteristicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.mobile[300]};
  ${MEDIA_QUERIES.medium}{
    margin-top: 30px;
  }
`;

export const EmailContainer = styled.div`
  background-color: ${colours.tertiary600};
  padding: ${theme.spacing.mobile[300]} ${theme.spacing.mobile[200]};
  margin: ${theme.spacing.mobile[300]} -13.8px -33px -13.8px;
  h1 {
    width: 100%;
    margin-bottom: 8px;
  }

  ${MEDIA_QUERIES.medium}{
    margin: 2.5rem 0px 0px 0px;
    padding: ${theme.spacing.desktop[300]} ${theme.spacing.desktop[200]};
  }
`;

export const EmailInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.mobile[300]};

  button {
    margin-right: 10px;
  }

  ${MEDIA_QUERIES.medium}{
    flex-direction: row;
    margin-top: 36px;
  }
`;

export const SubmitButtonStyled = styled(SecondaryButton)`
  margin-top: 1rem;
  padding: ${theme.spacing.desktop[100]} 6.1rem;
  font-size: ${theme.fonts.scale.desktop[75]};
  ${MEDIA_QUERIES.medium}{
    margin-top: 0rem;
    padding: ${theme.spacing.desktop[100]} ${theme.spacing.desktop[300]};
    font-size: ${theme.fonts.scale.desktop[75]};
  }
`;

interface IAvatarImageContainerProps {
  type?: Archetype;
}

export const AvatarImageContainer = styled.div<IAvatarImageContainerProps>`
  position: absolute;
  top: 0;
  ${({ type }) => type === Archetype.diyer && `left: -200px;`}
  ${({ type }) => type === Archetype.ponderer && `left: -290px;`}
  ${({ type }) => type === Archetype.boss && `left: -170px;`}
  ${({ type }) =>
    type === Archetype.workarounder &&
    `
    left: -290px;
    top: 250px;
  `}
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImageContainerMobile = styled.div<IAvatarImageContainerProps>`
  position: absolute;
  top: 13px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

export const GrassFooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 1250px;
  width: 100%;
  background-color: ${colours.prime600};
  ${MEDIA_QUERIES.medium}{
    height: 750px;
  }
`;

export const GrassInner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface IGrassImageContainer {
  position: "left" | "right";
}

export const GrassImageContainer = styled.div<IGrassImageContainer>`
  position: absolute;
  top: -90px;
  ${({ position }) => (position === "left" ? `left:` : `right:`)} 100px;
`;
