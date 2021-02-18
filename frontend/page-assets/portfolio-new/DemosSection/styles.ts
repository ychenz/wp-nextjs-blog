import styled from "styled-components";
import { cssVariables } from "src/styles/css";

import { marginContentToTopic, gridColumnDistance } from "../styles";

const DemosSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const DemoCard = styled.div`
  background: none;
  border: none;
  text-align: left;
  display: flex;
  width: 412px;
  padding: 4px;
  margin: ${marginContentToTopic} ${gridColumnDistance} 0 0;
  
  ${cssVariables.boxShadowHoverStyle}
  
  &:nth-child(2n) {
    margin-right: 0;
  }
`;

export const DemoCardIconContainer = styled.div`
  margin-right: 40px;
`;

export const DemoCardContent = styled.div`
  font-family: ${cssVariables.contentFontFamily};
  font-size: ${cssVariables.largeFontSize};
  line-height: ${cssVariables.paragraphFontSize};
  margin-top: ${cssVariables.uiUnitDouble};
`;

export const DemoCardActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${cssVariables.uiUnitDouble};
`;

export const DemoCardActionsViewCode = styled.a<{ color?: string }>`
  display: flex;
  align-items: center;
  stroke: ${p => p.color};
  cursor: pointer;
  padding: 0;
  z-index: 1;
`;

export const DemoCardActionsPlay = styled.a<{ color?: string }>`
  display: flex;
  align-items: center;
  stroke: ${p => p.color};
  cursor: pointer;
  padding: 0;
  margin-left: ${cssVariables.uiUnitDouble};
`;

export const Root = DemosSection;
