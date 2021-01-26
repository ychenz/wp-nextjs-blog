import React, { ReactElement } from "react";

import BarChartIcon from "static/images/BarChart.svg";
import GamePadIcon from "static/images/GamePad.svg";
import CloudApiIcon from "static/images/CloudApi.svg";
import DocumentIcon from "static/images/Document.svg";
import GithubOutlineIcon from "static/images/GithubOutline.svg";
import PlayOutlineIcon from "static/images/PlayOutline.svg";

import { SectionSubTitle } from "../styles";
import {
  Root,
  DemoCard,
  DemoCardContent,
  DemoCardIconContainer,
  DemoCardActionsContainer,
  DemoCardActionsGithub,
  DemoCardActionsPlay
} from "./styles";

function DemosSection(): ReactElement {

  const iconsList = [
    <BarChartIcon />,
    <GamePadIcon />,
    <CloudApiIcon />,
    <DocumentIcon />
  ];

  const titleList = [
    "Analytics",
    "Web Game",
    "Integrations",
    "Personal Website"
  ];

  const contentList = [
    "This demos a flexible stock market chart",
    "Gomuku game demo: A fun game with smart AI",
    "Talking to my assistant on Messenger integration, wikipedia integration",
    "Headless wordpress with custom Nextjs frontend using server side rendering and SEO"
  ];

  const colors = [
    "#A161BF",
    "#1DA7DA",
    "#F06E10",
    "#4DD488"
  ];

  return (
    <Root>
      {contentList.map((content, i) => (
        <DemoCard type="button" key={titleList[i]}>
          <DemoCardIconContainer>
            {iconsList[i]}
          </DemoCardIconContainer>
          <div>
            <SectionSubTitle>{titleList[i]}</SectionSubTitle>
            <DemoCardContent>{content}</DemoCardContent>
            <DemoCardActionsContainer>
              <DemoCardActionsGithub type="button"><GithubOutlineIcon /></DemoCardActionsGithub>
              <DemoCardActionsPlay color={colors[i]}><PlayOutlineIcon /></DemoCardActionsPlay>
            </DemoCardActionsContainer>
          </div>
        </DemoCard>
      ))}
    </Root>
  );
}

export default DemosSection;