import React, { ReactElement } from "react";

import LogoIcon from "static/images/LogoV1.svg";

import DemosSection from "./DemosSection";
import {
  Root,
  TopBar,
  BackButton,
  IconContainer,
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelfIntroSectionContainer,
  SelfIntroSectionTitle
} from "./styles";

function Portfolio(): ReactElement {
  return (
    <Root>
      <TopBar>
        <BackButton type="button">&#8592;{" "}BACK</BackButton>
        <IconContainer href="/">
          <LogoIcon />
        </IconContainer>
      </TopBar>
      <SelfIntroSectionContainer>
        <SectionTitle>HI, I’M</SectionTitle>
        <SelfIntroSectionTitle>YUCHEN</SelfIntroSectionTitle>
        <SelfIntroSectionContainer>
          <SectionContent>
            I’m a professional full-stack web developer based in Toronto.
            <br />
            Since 2018, I have been working for Ada as a web developer and the projects I built have assisted the
            company to grow its revenue by 100% from 2018 to year end 2020. I am specialized in building front-end
            applications using React & Redux to implement design solutions that satisfy complex user requirements.
            I strive to write high performance code that is highly modular and maintainable.
          </SectionContent>
        </SelfIntroSectionContainer>
      </SelfIntroSectionContainer>

      <SectionContainer>
        <SectionTitle>DEMOS</SectionTitle>
        <DemosSection />
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>PAST WORKS</SectionTitle>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>EMPLOYMENT HISTORY</SectionTitle>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>TESTIMONIALS</SectionTitle>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Skills</SectionTitle>
      </SectionContainer>
    </Root>
  );
}

export default Portfolio;