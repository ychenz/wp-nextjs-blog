import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";
import { CHART_HEIGHT, Y_LABEL_COUNT, X_LABEL_COUNT } from "./constants";

export const Root = styled.div`
  position: relative;
  width: 100%;
  min-width: 800px;
  margin-top: 40px;
  padding-left: 40px; // leaving space for Y labels
`;

export const FrameBackground = styled.div`
  position: relative;
  height: ${CHART_HEIGHT}px;
  border-left: 1px solid ${cssColors.colorBlack};
  border-bottom: 1px solid ${cssColors.colorBlack};
`;

const firstLineMarginTop = 12;
const yLineDistance = (CHART_HEIGHT - firstLineMarginTop) / (Y_LABEL_COUNT - 1);
export const FrameBackgroundGridLine = styled.div<{ count: number }>`
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(${firstLineMarginTop}px + ${({ count }) => count * yLineDistance }px);
  border-top: 1px solid ${cssColors.colorGray5};
`;

export const YLabelsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const yLabelsFontHeight = 19;
const yLabelsDistance = (CHART_HEIGHT - Y_LABEL_COUNT * yLabelsFontHeight) / (Y_LABEL_COUNT - 1);
export const YLabelsText = styled.div<{ count: number }>`
  margin-top: ${({ count }) => count === 0 ? 0 : yLabelsDistance}px;
  font-family: ${cssVariables.titleFontFamily};
  font-size: ${cssVariables.smallFontSize};
  line-height: ${yLabelsFontHeight}px;
  color: ${cssColors.colorGray5};
`;

export const XLabelContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: ${cssVariables.uiUnit};
`;

export const XLabelsText = styled.div`
  width: calc(100%/${X_LABEL_COUNT});
  text-align: center;
  font-family: ${cssVariables.titleFontFamily};
  font-size: ${cssVariables.largeFontSize};
  line-height: 25px;
  color: ${cssColors.colorGray6};
`;
