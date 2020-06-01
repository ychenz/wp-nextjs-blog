import styled from "styled-components";
import { cssVariables } from "src/styles/css";

export const CategoryContainer = styled.div`
  margin: ${cssVariables.uiUnit} 0 ${cssVariables.uiUnitDouble} 0;
  display: flex;
  align-items: center;
  padding: 0 ${cssVariables.uiUnit};
`;