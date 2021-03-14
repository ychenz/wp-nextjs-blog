import React, { ReactElement } from "react";
import Link from "next/link";

import BarChartIcon from "static/images/BarChart.svg";
import GamePadIcon from "static/images/GamePad.svg";
import CloudApiIcon from "static/images/CloudApi.svg";
import DocumentIcon from "static/images/Document.svg";
import GithubOutlineIcon from "static/images/GithubOutline.svg";
import PlayOutlineIcon from "static/images/PlayOutline.svg";

import { SectionSubTitle } from "page-assets/portfolio-new/styles";
import { profilePageName } from "services/constants";
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
  sourceUrl: string;
}

export const demosList: DemoOption[] = [
  {
    name: "Analytics",
    value: "analytics",
    description: "This demos a line chart for Apple stock using real market data fetched from FMP APIs",
    url: "https://stock-chart-demo.yuchenz.net/",
    sourceUrl: "https://github.com/ychenz/stock-chart-demo"
  },
  {
    name: "Web Game",
    value: "web-game",
    description: "Play Gomuku game with a smart bot player",
    url: "https://gomoku-demo.yuchenz.net/",
    sourceUrl: "https://github.com/ychenz/gomoku-web-game-demo"
  },
  // {
  //   name: "Integrations",
  //   value: "integrations",
  //   description: "Talking to my virtual assistant on Messenger integration, wikipedia integration",
  //   url: "#",
  //   sourceUrl: "#"
  // },
  // {
  //   name: "Personal Website",
  //   value: "personal-website",
  //   description: "Headless wordpress with custom Nextjs frontend using server side rendering and SEO",
  //   url: "#",
  //   sourceUrl: "#"
  // },
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
        <DemoCard key={demoOption.value}>
          <DemoCardIconContainer>
            {iconsList[i]}
          </DemoCardIconContainer>
          <div>
            <SectionSubTitle>{demoOption.name}</SectionSubTitle>
            <DemoCardContent>{demoOption.description}</DemoCardContent>
            <DemoCardActionsContainer>
              <DemoCardActionsViewCode color="black" href={demoOption.sourceUrl}>
                <GithubOutlineIcon />
              </DemoCardActionsViewCode>
              <Link href={`/${profilePageName}/[demo]`} as={`/${profilePageName}/${demoOption.value}`}>
                <DemoCardActionsPlay color={colors[i]}><PlayOutlineIcon /></DemoCardActionsPlay>
              </Link>
            </DemoCardActionsContainer>
          </div>
        </DemoCard>
      ))}
    </Root>
  );
}
