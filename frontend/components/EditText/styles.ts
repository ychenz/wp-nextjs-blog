import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";

export const Root = styled.div`
  position: relative;
`;

export const ClearButtonContainer = styled.button`
  position: absolute;
  align-items: center;
  right: ${cssVariables.uiUnitDouble};
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
`;

export const FormInput = styled.input`
  border: 1px ${cssColors.colorBlack} solid;
  width: calc(100% - 64px); // Need to minus the inner padding of the input to correct width
  padding: 14px 40px 14px 24px;
  font-size: ${cssVariables.xxLargeFontSize};
  font-family: ${cssVariables.titleFontFamily};
  line-height: 32px;
  
  &::placeholder {
    color: ${cssColors.colorBgPrimary};
    font-size: ${cssVariables.xxLargeFontSize};
    line-height: 24px;
  }
`;