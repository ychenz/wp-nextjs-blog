import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";

const paddingSides = "120px";

export const Root = styled.div<{ hidden: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #505050dd; // Use color alpha channel for animation, cuz 'opacity' is always inherited by children
  z-index: 3; // Bring to front
  visibility: visible;
  transition: all .3s ease;
  
  ${({ hidden }) => hidden && `
     visibility: hidden;
     background-color: #50505000;
  `};
`;

export const Container = styled.div<{ hidden: boolean }>`
  height: 512px;
  width: 528px;
  display: initial;  // Required for animation
  background-color: ${cssColors.colorWhite};
  opacity: 1;
  transition: opacity .3s ease;
  padding: 0 ${paddingSides};
  position: relative;
  
  ${({ hidden }) => hidden && `
     opacity: 0;
  `};
`;

export const Title = styled.div`
  font-size: 32px;
  color: ${cssColors.colorBlack};
  line-height: 32px;
  margin: 76px 0 56px;
  font-family: ${cssVariables.titleFontFamily};
  
  & > b {
    font-weight: ${cssVariables.mediumFontWeight};
  }
`;

export const FormInput = styled.input`
  border: 1px ${cssColors.colorBlack} solid;
  width: calc(100% - 48px); // Need to minus the inner padding of the input to correct width
  margin-bottom: 24px;
  padding: 14px 24px;
  font-size: ${cssVariables.xxLargeFontSize};
  font-family: ${cssVariables.titleFontFamily};
  line-height: 32px;
  
  &::placeholder {
    color: ${cssColors.colorBgPrimary};
    font-size: ${cssVariables.xxLargeFontSize};
    line-height: 24px;
  }
`;

export const AcknowledgeText = styled.div`
  font-weight: ${cssVariables.mediumFontWeight};
  font-size: ${cssVariables.smallFontSize};
  line-height: 16px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  right: ${paddingSides};
  bottom: 0;
  margin: 40px 0 64px;
`;
