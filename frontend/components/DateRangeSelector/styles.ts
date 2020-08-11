import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";

export const Root = styled.div`
  display: flex;
  align-items: center;
`;

export const DateRangeButton = styled.div<{ isActive: boolean }>`
  font-family: ${cssVariables.titleFontFamily};
  font-weight: ${cssVariables.heavyFontWeight};
  font-size: ${cssVariables.uiUnitDouble};
  line-height: 20px;
  border-radius: ${cssVariables.largeBorderRadius};
  margin-right: 40px;
  padding: 0 ${cssVariables.uiUnit};
  cursor: pointer;
  
  color:  ${({ isActive }) => isActive ? cssColors.colorWhite : cssColors.colorGray4};
  ${({ isActive }) => isActive && `background-color: ${cssColors.colorGray4}`};
  
  &:hover {
    background-color: ${({ isActive }) => isActive ? cssColors.colorGray4 : cssColors.colorGray3};
  }
  
  // Last child of this should not have margin
  &:last-child {
    margin-right: 0;
  }
`;