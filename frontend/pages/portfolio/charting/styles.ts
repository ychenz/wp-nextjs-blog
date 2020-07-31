import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";

export const Root = styled.div`
  
`;

export const HorizontalContainer = styled.div<{ marginTop: number }>`
  margin-top: ${({ marginTop }) => marginTop || "0"}px;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  margin-right: ${cssVariables.uiUnitDouble};
`;

export const Title = styled.div`
  color: ${cssColors.colorTitle1};
  line-height: 32px;
  font-size: ${cssVariables.xxLargeFontSize};
  font-family: ${cssVariables.titleFontFamily};
  font-weight: ${cssVariables.mediumFontWeight};
`;

export const CompanyNameText = styled.div`
  font-size: ${cssVariables.xxLargeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  line-height: 32px;
  color: ${cssColors.colorBlack};
  font-family: ${cssVariables.titleFontFamily};
  margin-right: ${cssVariables.uiUnitDouble};
`;

export const Ticker = styled.div`
  font-size: ${cssVariables.largeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  line-height: 24px;
  color: ${cssColors.colorGray4};
  font-family: ${cssVariables.titleFontFamily};
  margin-right: ${cssVariables.uiUnit};
`;

export const DateStr = styled.div`
  font-size: ${cssVariables.smallFontSize};
  line-height: 20px;
  color: ${cssColors.colorGray5};
  font-family: ${cssVariables.titleFontFamily};
`;

export const CurrentPriceText = styled.div`
  font-size: ${cssVariables.pentaLargeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  line-height: 56px;
  color: ${cssColors.colorGray4};
  font-family: ${cssVariables.titleFontFamily};
  margin-right: ${cssVariables.uiUnitDouble};
`;

export const PriceChange = styled.div<{ isNegative: boolean }>`
  font-size: ${cssVariables.xxLargeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  line-height: 32px;
  color: ${({ isNegative }) => isNegative ? cssColors.colorBloodRed : cssColors.colorSoftGreen};
  font-family: ${cssVariables.titleFontFamily};
  margin-right: ${cssVariables.uiUnit};
`;



