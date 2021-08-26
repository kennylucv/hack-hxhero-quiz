import React from "react";
import {
  CharacteristicsCard,
  CharacteristicsCardContent,
  CharacteristicsTextContainer,
  CharacteristicsImageContainer,
} from "./CharacteristicCardStyled";

import CostAversion from "../../assets/CostAversion.svg";
import ActionOrientation from "../../assets/ActionOrientation.svg";
import ResearchOrientation from "../../assets/ResearchOrientation.svg";
import RiskAversion from "../../assets/RiskAversion.svg";
import { Heading, Paragraph, Subheading } from "@homex/hx-component-library";
import { colours } from "../../constants/styles";
import { LinearProgress } from "@material-ui/core";

export enum Characteristic {
  price = "price",
  risk = "risk",
  action = "action",
  knowledge = "knowledge",
}

export interface ICharacteristicCardProps {
  type: Characteristic;
  value: number;
}

const strings = {
  priceHeader: "Cost Aversion",
  priceBody:
    "How much money you’re willing (or not willing) to spend on home management",
  riskHeader: "Risk Aversion",
  riskBody:
    "How much risk you're willing to take when it comes to home management tasks",
  actionHeader: "Action Orientation",
  actionBody:
    "Whether or not you're likely to take action with home management tasks",
  knowledgeHeader: "Research Orientation",
  knowledgeBody:
    "Whether or not you're a learner when it comes to home management",
};

const CharacteristicCard = (props: ICharacteristicCardProps): JSX.Element => {
  const { type, value } = props;

  const imgSrc = () => {
    switch (type) {
      case Characteristic.price:
        return CostAversion;
      case Characteristic.risk:
        return RiskAversion;
      case Characteristic.action:
        return ActionOrientation;
      case Characteristic.knowledge:
        return ResearchOrientation;
      default:
        return CostAversion;
    }
  };

  const getTextContent = (): {
    headerText: string;
    bodyText: string;
  } => {
    switch (type) {
      case Characteristic.price:
        return { headerText: strings.priceHeader, bodyText: strings.priceBody };
      case Characteristic.risk:
        return { headerText: strings.riskHeader, bodyText: strings.riskBody };
      case Characteristic.action:
        return {
          headerText: strings.actionHeader,
          bodyText: strings.actionBody,
        };
      case Characteristic.knowledge:
        return {
          headerText: strings.knowledgeHeader,
          bodyText: strings.knowledgeBody,
        };
      default:
        return { headerText: strings.riskHeader, bodyText: strings.riskBody };
    }
  };

  const { headerText, bodyText } = getTextContent();

  return (
    <CharacteristicsCard>
      <CharacteristicsCardContent>
        <CharacteristicsImageContainer>
          <img src={imgSrc()} alt="cost aversion" />
        </CharacteristicsImageContainer>
        <CharacteristicsTextContainer>
          <Heading
            $fontSize="xxs"
            $fontWeight="bold"
            $fontColor={colours.neutral600}
            $textAlign="left"
          >
            {headerText}
          </Heading>
          <Paragraph
            $fontSize="xxs"
            $fontWeight="regular"
            $fontColor={colours.neutral600}
            $textAlign="left"
          >
            {bodyText}
          </Paragraph>
        </CharacteristicsTextContainer>
      </CharacteristicsCardContent>
      <LinearProgress
        variant="determinate"
        value={value}
        style={{ backgroundColor: colours.progressGray }}
      />
    </CharacteristicsCard>
  );
};

export default CharacteristicCard;
