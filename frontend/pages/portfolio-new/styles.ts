import styled from "styled-components";
import { cssVariables } from "src/styles/css";

const PortfolioPage = styled.div`
  max-width: 950px;
  min-width: ${cssVariables.postContentMinWidth};
  padding-top: 120px;
  margin: auto;
`;

export const Root = PortfolioPage;

export const TopBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const BackButton = styled.button`
  font-size: ${cssVariables.largeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  font-family: "Nunito", sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const IconContainer = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const SectionTitle = styled.div`
  font-family: "Saira", sans-serif;
  font-size: ${cssVariables.xxLargeFontSize};
  line-height: 32px;
  font-weight: ${cssVariables.heavyFontWeight};
`;

export const SectionSubTitle = styled.div`
  font-family: "Saira", sans-serif;
  font-size: ${cssVariables.largeFontSize};
  line-height: 24px;
  font-weight: ${cssVariables.heavyFontWeight};
`;

export const SectionContent = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: ${cssVariables.largeFontSize};
  line-height: 22px;
`;

export const SectionContainer = styled.div`
  margin-top: 128px;
`;

export const SelfIntroSectionTitle = styled.div`
  font-family: "Saira", sans-serif;
  font-size: ${cssVariables.pentaLargeFontSize};
  line-height: 56px;
  font-weight: ${cssVariables.heavyFontWeight};
  margin-top: ${cssVariables.uiUnitDouble};
`;

export const SelfIntroSectionContainer = styled.div`
  max-width: 700px;
  margin-top: 64px;
`;