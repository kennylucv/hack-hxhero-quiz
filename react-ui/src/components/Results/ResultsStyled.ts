import styled from "styled-components";
import { colours } from "../../constants/styles";
import { Archetype } from "../../interfaces/quiz";
import { Page } from "../genericsStyled";

export const ResutlsPage = styled(Page)`
  position: relative;
`;

export const ResultsContent = styled.div`
  margin-bottom: 100px;
  padding: 54px 128px;
  display: flex;
  flex-direction: column;
  max-width: 844px;
  min-height: 430px;
  background: #ffffff;
  border: 1px solid #d4eef5;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 10;
  position: relative;
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
  margin-top: 30px;
`;

export const EmailContainer = styled.div`
  background-color: ${colours.tertiary600};
  margin-top: 40px;
  padding: 32px 24px;

  h1 {
    width: 100%;
    margin-bottom: 8px;
  }
`;

export const EmailInputContainer = styled.div`
  margin-top: 36px;
  display: flex;

  button {
    margin-right: 10px;
  }
`;

interface IAvatarImageContainerProps {
  type: Archetype;
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

export const GrassFooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${colours.prime600};
  height: 750px;
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
