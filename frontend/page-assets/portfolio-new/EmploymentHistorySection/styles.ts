import styled from "styled-components";

import { cssColors, cssVariables } from "src/styles/css";
import {
  marginContentToTopic,
} from "../styles";

const EmploymentHistorySection = styled.div`
  margin-top: ${marginContentToTopic};
  border-left: 1px solid ${cssColors.colorBorder};
  padding-left: 40px;
  margin-left: 40px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EmploymentDateText = styled.div`
  margin-left: ${cssVariables.uiUnitDouble};
  font-family: ${cssVariables.titleFontFamily};
  font-size: ${cssVariables.smallFontSize};
  color: ${cssColors.colorGray5};
  line-height: 16px;
`;

export const PositionText = styled.div`
  margin-top: ${cssVariables.uiUnit};
  font-family: ${cssVariables.titleFontFamily};
  font-size: ${cssVariables.largeFontSize};
  line-height: 20px;
`;

export const DescriptionText = styled.div`
  margin-top: ${cssVariables.uiUnitDouble};
  font-family: ${cssVariables.contentFontFamily};
  font-size: ${cssVariables.smallFontSize};
  line-height: 16px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-left: 32px;
`;

export const PaginationButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  padding: ${cssVariables.uiUnit};
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: all .5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${cssColors.colorGray3};
  }
  
  &:focus, :active {
    outline: none;
  }
`;

export const PaginationDot = styled.div<{ active?: boolean }>`
  box-shadow: 0 0 3px ${cssColors.colorBorder};
  border-radius: 50%;
  height: ${cssVariables.uiUnit};
  width: ${cssVariables.uiUnit};
  background: none;
  transition: all .5s ease;

  ${p => p.active &&`
    background: ${cssColors.colorBorder};
  `}
`;

export const Root = EmploymentHistorySection;