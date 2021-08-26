import { colours } from "./../../constants/styles";
import styled from "styled-components";

export const CharacteristicsCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  border: 1px solid ${colours.tertiary200};
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const CharacteristicsCardContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
`;

export const CharacteristicsImageContainer = styled.div`
  img {
    width: 70px;
    height: 70px;
  }
`;

export const CharacteristicsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  margin-left: 18px;
`;
