import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";

export const Root = styled.button<{ isTransparent: boolean }>`
  border: none;
  background-color: ${({ isTransparent }) => isTransparent ? cssColors.colorTransparent : cssColors.colorWhite};
  cursor: pointer;
  font-family: ${cssVariables.titleFontFamily};
  font-weight: ${cssVariables.mediumFontWeight};
  font-size: ${cssVariables.xxLargeFontSize};
  line-height: 32px;
  color: ${cssColors.colorBgPrimary};
  padding: ${cssVariables.uiUnit} 0;
  
  &:hover {
    border-bottom: 2px ${cssColors.colorBgPrimary} solid;
    padding-bottom: 6px;
  }
`;
