import styled from "styled-components";
import { cssVariables } from "src/styles/css";

const PortfolioPage = styled.div`
  max-width: 950px;
  min-width: ${cssVariables.postContentMinWidth};
  padding: 120px ${cssVariables.uiUnitDouble};
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

export const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  & > div {
    flex: 50%; // This making sure we have equally divided 2 columns layout
    min-width: 320px; // This allows auto-wrap for small screens
  }
`;

/**
 * Self Intro section
 */
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

/**
 * Past work section
 */
export const PastWorkSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PastWorkSectionEntry = styled.div`
  margin: 40px 40px 0 0;
  
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

export const PastWorkSectionEntryThumbnail = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  & > img {
    width: 206px;
    height: 154px;
  }
`;

export const PastWorkSectionEntryTitle = styled.button`
  background: none;
  border: none;
  text-align: left;
  padding: 0;
  margin-top: ${cssVariables.uiUnitDouble};
  font-family: "Nunito", sans-serif;
  font-size: ${cssVariables.largeFontSize};
  text-decoration-line: underline;
  line-height: 20px;
  cursor: pointer;
`;

/**
 * Skills section
 */
export const SkillsSectionTagCloudContainer = styled.div`
  margin-top: 40px;
  width: 290px;
  height: 206px;
`;

/**
 * Contact section
 */
export const ContactSectionContainer = styled.div`
  margin-top: 40px;
`;

export const ContactSectionSocialIconsContainer = styled.div`
  display: flex;
  margin-top: 24px;
  align-items: center;
  
  & > svg {
    margin-right: ${cssVariables.uiUnitDouble};
  }
`;

export const ContactSectionDownloadResumeButton = styled.button`
  background: none;
  border: none;
  text-align: left;
  padding: 0;
  margin-top: 24px;
  font-family: "Saira", sans-serif;
  font-size: ${cssVariables.largeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  text-decoration-line: underline;
  line-height: 24px;
  cursor: pointer;
`;

export const ContactSectionCopyRight = styled.div`
  margin-top: 64px;
  font-family: "Nunito", sans-serif;
  font-size: ${cssVariables.largeFontSize};
  line-height: 22px;
 
`;
