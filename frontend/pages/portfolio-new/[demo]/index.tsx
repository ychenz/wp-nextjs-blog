import React, { ReactElement } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { demosList } from "page-assets/portfolio-new/DemosSection";

import * as PortfolioPageStyle from "page-assets/portfolio-new/styles";
import LogoIcon from "static/images/LogoV1.svg";

import * as S from "page-assets/portfolio-new/[demo]/styles";

export default function DemoSubpage(): ReactElement {
  const router = useRouter();
  const { demo } = router.query;

  const selectedDemoOption = demosList.find(
    demoOption => demoOption.value === demo
  );

  // This can be none on 1st render after refresh before value is injected from router
  if (!selectedDemoOption) {
    return null;
  }

  return (
    <PortfolioPageStyle.Root>
      <PortfolioPageStyle.TopBar>
        <Link href="/portfolio-new">
          <PortfolioPageStyle.BackButton type="button">&#8592;{" "}BACK</PortfolioPageStyle.BackButton>
        </Link>
        <PortfolioPageStyle.IconContainer href="/">
          <LogoIcon />
        </PortfolioPageStyle.IconContainer>
      </PortfolioPageStyle.TopBar>
      <S.Title>
        {selectedDemoOption.name}
      </S.Title>
      <S.Description>
        {selectedDemoOption.description}
      </S.Description>
      <S.DemoIFrameContainer>
        <S.DemoIFrame src={selectedDemoOption.url} title={`${selectedDemoOption.name} Demo`} frameBorder="0" />
      </S.DemoIFrameContainer>
    </PortfolioPageStyle.Root>
  );
}
