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
  description: string;
  url: string;
}

export const demosList: DemoOption[] = [
  {
    name: "Analytics",
    value: "analytics",
    description: "This demos a flexible stock market chart",
    url: "https://stock-chart-demo.yuchenz.net/"
  },
  {
    name: "Web Game",
    value: "web-game",
    description: "Play Gomuku game with a smart AI opponent",
    url: "https://gomoku-demo.yuchenz.net/"
  },
  {
    name: "Integrations",
    value: "integrations",
    description: "Talking to my virtual assistant on Messenger integration, wikipedia integration",
    url: "#"
  },
  {
    name: "Personal Website",
    value: "personal-website",
    description: "Headless wordpress with custom Nextjs frontend using server side rendering and SEO",
    url: "#"
  },
];

export default function DemosSection(): ReactElement {
  const iconsList = [
    <BarChartIcon />,
    <GamePadIcon />,
    <CloudApiIcon />,
    <DocumentIcon />
  ];

  const colors = [
    "#A161BF",
    "#1DA7DA",
    "#F06E10",
    "#4DD488"
  ];

  return (
    <Root>
      {demosList.map((demoOption, i) => (
        <Link href="/portfolio-new/[demo]" as={`/portfolio-new/${demoOption.value}`}>
          <DemoCard
            aria-label={`Demo button for ${demoOption.name}`}
            type="button"
            key={demoOption.value}
          >
            <DemoCardIconContainer>
              {iconsList[i]}
            </DemoCardIconContainer>
            <div>
              <SectionSubTitle>{demoOption.name}</SectionSubTitle>
              <DemoCardContent>{demoOption.description}</DemoCardContent>
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
