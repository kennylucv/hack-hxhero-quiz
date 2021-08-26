import { Heading, PrimaryButton } from "@homex/hx-component-library";
import React from "react";
import { colours } from "../../constants/styles";
import {
  CloudLeftContainer,
  CloudRightContainer,
  IntroContent,
  SubHeadingStyled,
} from "./DashboardStyled";

import CloudLeft from "../../assets/CloudLeft.svg";
import CloudRight from "../../assets/CloudRight.svg";
import { Page } from "../genericsStyled";
import GraphicFooter from "../GraphicFooter/GraphicFooter";

interface IIntroProps {
  onClickStart: () => void;
}

const strings = {
  headerText: "What Kind of Home Hero Are You?",
  bodyText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  ctaText: "Start Quiz",
};

const Dashboard = (): JSX.Element => {
  return <Page></Page>;
};

export default Dashboard;
