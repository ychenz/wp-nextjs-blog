import styled from "styled-components";
import { cssVariables } from "src/styles/css";

export const Title = styled.div`
  font-family: ${cssVariables.titleFontFamily};
  font-size: ${cssVariables.xxLargeFontSize};
  line-height: 32px;
  font-weight: ${cssVariables.heavyFontWeight};
  margin-top: 64px;
`;