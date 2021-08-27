import {
  Heading,
  Input,
  Paragraph,
  SecondaryButton,
} from "@homex/hx-component-library";
import React, { useEffect, useState } from "react";
import { colours } from "../../constants/styles";
import { Archetype, IAnswer, IScore } from "../../interfaces/quiz";
import CharacteristicCard, {
  Characteristic,
} from "../CharacteristicCard/CharacteristicCard";
import {
  AvatarImageContainer,
  CharacteristicsContainer,
  EmailContainer,
  EmailInputContainer,
  GrassFooterContainer,
  GrassImageContainer,
  GrassInner,
  ResultsContent,
  ResultsHeader,
  ResutlsPage,
} from "./ResultsStyled";

interface IResultsProps {
  sessionId: string;
  answers: IAnswer[];
  onStartOver: () => void;
}

import DiyerGraphic from "../../assets/DiyerGraphic.svg";
import WorkArounderGraphic from "../../assets/WorkArounderGraphic.svg";
import BossGraphic from "../../assets/BossGraphic.svg";
import PondererGraphic from "../../assets/PondererGraphic.svg";
import GrassLeft from "../../assets/GrassLeft.svg";
import getSessionData from "../../api/getSessionData";

const strings = {
  diyerHeader: "You're the DIYer!",
  diyerBody:
    "When something goes wrong in your home, you probably already know what’s up and how to fix it. And if not, you're willing to roll up your sleeves and try on your own first. “I can do anything I put my mind to!” is your motto, and “trial and error” is your game. If you do get stuck, you turn to research, and then maybe call in the pros.",
  pondererHeader: "You’re the Ponderer!",
  pondererBody:
    "When something goes wrong in your home, first things first: put on your sleuthing hat. You ask questions, then act. If you’re feeling up for it, you’ll swap that hat for your contractor’s one and take on less-risky tasks yourself. As someone who finds comfort in certainty, you thrive as the Home Hero who makes educated decisions to get the job done, the right way.",
  workarounderHeader: "You’re the Workarounder!",
  workarounderBody:
    "You’ll work around an issue in your home until it’s not there anymore (or it’s too late). Some may call it lazy, we’ll call it opportunistic...you’ll leave any problem for as long as your creative ways around it can suffice, even if it means you’re taking this quiz on your computer in the kitchen because the outlets in your office don’t work. (Don’t worry, no judgement here!)",
  bossHeader: "You’re the Boss!",
  bossBody:
    "When it comes to home management, you’re in charge—and everyone knows it. Capeesh!? You know what strings to pull and when to pull them to get the things that need gettin’ done, done. You hustle for a no-hassle lifestyle, and it keeps you and those around you in check, 24/7.",
  emailHeader: "Want to Know More?",
  emailBody:
    "We’ll send an email with more details about your type and some tips and tricks for managing your home!",
  enterEmail: "Enter your email address *",
};

const Results = (props: IResultsProps): JSX.Element => {
  const [emailInput, setEmailInput] = useState("");
  const [resultArchetype, setResultArchtype] = useState<Archetype | undefined>(
    undefined
  );
  const [scores, setScores] = useState<IScore | undefined>(undefined); 

  const getStrings = (): {
    headerText: string;
    bodyText: string;
  } => {
    switch (resultArchetype) {
      case Archetype.diyer:
        return { headerText: strings.diyerHeader, bodyText: strings.diyerBody };
      case Archetype.ponderer:
        return {
          headerText: strings.pondererHeader,
          bodyText: strings.pondererBody,
        };
      case Archetype.workarounder:
        return {
          headerText: strings.workarounderHeader,
          bodyText: strings.workarounderBody,
        };
      case Archetype.boss:
        return { headerText: strings.bossHeader, bodyText: strings.bossBody };
      default:
        return { headerText: strings.diyerHeader, bodyText: strings.diyerBody };
    }
  };

  const { headerText, bodyText } = getStrings();

  const getGraphic = () => {
    switch (resultArchetype) {
      case Archetype.diyer:
        return DiyerGraphic;
      case Archetype.ponderer:
        return PondererGraphic;
      case Archetype.workarounder:
        return WorkArounderGraphic;
      case Archetype.boss:
        return BossGraphic;
      default:
        return DiyerGraphic;
    }
  };

  useEffect(() => {
    if (!resultArchetype) {
      getSessionData(props.sessionId).then((data) => {
        console.log("data", { data });
        if (data) {
          setResultArchtype(data.archetype);
          setScores(data.scores);
        }
      });
    }
  }, [resultArchetype]);

  console.log("res Archetype", { resultArchetype });

  return (
    <ResutlsPage>
      <ResultsContent>
        <ResultsHeader>
          <Heading
            $fontColor={colours.prime600}
            $textAlign="center"
            $fontSize="m"
          >
            {headerText}
          </Heading>
          <Paragraph
            $fontColor={colours.black}
            $textAlign="center"
            $fontWeight="light"
            $fontSize="s"
          >
            {bodyText}
          </Paragraph>
        </ResultsHeader>

        <CharacteristicsContainer>
          <CharacteristicCard type={Characteristic.price} value={scores ? scores.price : 0} />
          <CharacteristicCard type={Characteristic.risk} value={scores ? scores.risk : 0} />
          <CharacteristicCard type={Characteristic.action} value={scores ? scores.action : 0} />
          <CharacteristicCard type={Characteristic.knowledge} value={scores ? scores.knowledge : 0} />
        </CharacteristicsContainer>

        <EmailContainer>
          <Paragraph
            $fontColor={colours.common100}
            $textAlign="center"
            $fontSize="s"
          >
            {strings.emailHeader}
          </Paragraph>
          <Paragraph
            $fontColor={colours.common100}
            $textAlign="center"
            $fontSize="xxs"
          >
            {strings.emailBody}
          </Paragraph>

          <EmailInputContainer>
            <Input
              inputSize="sm"
              placeholder={strings.enterEmail}
              value={emailInput}
              onChange={(e) => console.log(e)}
            />
            <SecondaryButton btnSize="xs">Submit</SecondaryButton>
          </EmailInputContainer>
        </EmailContainer>

        <AvatarImageContainer type={resultArchetype}>
          <img src={getGraphic()} alt={"diyer"} />
        </AvatarImageContainer>
      </ResultsContent>
      <GrassFooterContainer>
        <GrassInner>
          <GrassImageContainer position="left">
            <img src={GrassLeft} alt={"grass"} />
          </GrassImageContainer>
          <GrassImageContainer position="right">
            <img src={GrassLeft} alt={"grass"} />
          </GrassImageContainer>
        </GrassInner>
      </GrassFooterContainer>
    </ResutlsPage>
  );
};

export default Results;
