import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";

export const ParticleBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  
  & div {
    height: 100%;
  }
`;

export const Title = styled.div`
  color: ${cssColors.colorTitle1};
  line-height: 48px;
  font-size: ${cssVariables.xxxLargeFontSize};
  margin-top: 300px;
  font-family: ${cssVariables.titleFontFamily};
  font-weight: ${cssVariables.mediumFontWeight};
`;

export const ButtonContainer = styled.div`
  margin-top: 3 * ${cssVariables.uiUnit};
`;

