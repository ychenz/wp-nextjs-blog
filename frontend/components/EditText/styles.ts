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
  
  &:hover {
    & circle {
      fill-opacity: 1;
    }
  }
  
  &:focus {
    outline: none;
  }
`;

export const FormInput = styled.input<{ error?: boolean }>`
  border: 1px ${({ error }) => error ? cssColors.colorWarmOrange : cssColors.colorBlack} solid;
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

export const ErrorText = styled.div`
  margin-top: ${cssVariables.uiUnitHalf};
  font-family: ${cssVariables.titleFontFamily};
  font-weight: ${cssVariables.mediumFontWeight};
  font-size: ${cssVariables.uiUnit};
  line-height: 12px;
  color: ${cssColors.colorWarmOrange};
`;

export const DropDownMenuContainer = styled.div`
  position: absolute;
  top: calc(100% + ${cssVariables.uiUnit});
  left: 0;
  width: 100%;
  background: ${cssColors.colorWhite};
  z-index: 10;
  box-shadow: 0 ${cssVariables.uiUnit} ${cssVariables.uiUnit} rgba(0, 0, 0, 0.25);
`;

export const DropDownMenuEntry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${cssColors.colorGray4};
  cursor: pointer;
  border-bottom: 1px solid ${cssColors.colorGray5};
  padding: ${cssVariables.uiUnitDouble};
  
  &:last-child {
    border: none;
  }
  
  &:hover {
    background-color: ${cssColors.colorGray3};
  }
`;

export const DropDownMenuTitle = styled.div`
  font-size: ${cssVariables.xxLargeFontSize};
  font-family: ${cssVariables.titleFontFamily};
  line-height: 32px;
`;

export const DropDownMenuDescription = styled.div`
  font-size: ${cssVariables.largeFontSize};
  font-family: ${cssVariables.titleFontFamily};
  line-height: 24px;
`;