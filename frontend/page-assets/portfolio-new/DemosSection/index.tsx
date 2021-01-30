import React, { ReactElement } from "react";
import Link from "next/link";

import BarChartIcon from "static/images/BarChart.svg";
import GamePadIcon from "static/images/GamePad.svg";
import CloudApiIcon from "static/images/CloudApi.svg";
import DocumentIcon from "static/images/Document.svg";
import GithubOutlineIcon from "static/images/GithubOutline.svg";
import PlayOutlineIcon from "static/images/PlayOutline.svg";

import { SectionSubTitle } from "page-assets/portfolio-new/styles";
import {
  Root,
  DemoCard,
  DemoCardContent,
  DemoCardIconContainer,
  DemoCardActionsContainer,
  DemoCardActionsViewCode,
  DemoCardActionsPlay
} from "./styles";

export interface DemoOption{
  name: string;
  value: string;
}

export const demosList: DemoOption[] = [
  { name: "Analytics", value: "analytics" },
  { name: "Web Game", value: "web-game" },
  { name: "Integrations", value: "integrations" },
  { name: "Personal Website", value: "personal-website" },
];

export default function DemosSection(): ReactElement {

  const iconsList = [
    <BarChartIcon />,
    <GamePadIcon />,
    <CloudApiIcon />,
    <DocumentIcon />
  ];


  const contentList = [
    "This demos a flexible stock market chart",
    "Play Gomuku game with a smart AI opponent",
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
        <Link href="/portfolio-new/[demo]" as={`/portfolio-new/${demosList[i].value}`}>
          <DemoCard
            aria-label={`Demo button for ${demosList[i].name}`}
            type="button"
            key={demosList[i].value}
          >
            <DemoCardIconContainer>
              {iconsList[i]}
            </DemoCardIconContainer>
            <div>
              <SectionSubTitle>{demosList[i].name}</SectionSubTitle>
              <DemoCardContent>{content}</DemoCardContent>
              <DemoCardActionsContainer>
                <DemoCardActionsViewCode color="black"><GithubOutlineIcon /></DemoCardActionsViewCode>
                <DemoCardActionsPlay color={colors[i]}><PlayOutlineIcon /></DemoCardActionsPlay>
              </DemoCardActionsContainer>
            </div>
          </DemoCard>
        </Link>
      ))}
    </Root>
  );
}
