import styled from "styled-components";
import { cssVariables } from "src/styles/css";

const DemosSection = styled.div`
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const DemoCard = styled.div`
  display: flex;
  width: 452px;
  margin-top: 40px;
  cursor: pointer;
  padding: 4px;
  
  ${cssVariables.boxShadowHoverStyle}
`;

export const DemoCardIconContainer = styled.div`
  margin-right: 40px;
`;

export const DemoCardContentContainer = styled.div`
`;

export const DemoCardContent = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: ${cssVariables.largeFontSize};
  line-height: ${cssVariables.paragraphFontSize};
  margin-top: ${cssVariables.uiUnitDouble};
`;

export const DemoCardActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${cssVariables.uiUnitDouble};
`;

export const DemoCardActionsGithub = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const DemoCardActionsPlay = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  stroke: ${p => p.color};
  cursor: pointer;
  padding: 0;
  margin-left: ${cssVariables.uiUnitDouble};
`;

export const Root = DemosSection;
