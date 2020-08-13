import styled from "styled-components";
import { cssColors } from "src/styles/css";

export const Root = styled.div<{ hidden: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
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
  display: initial;  // Required for animation
  background-color: ${cssColors.colorWhite};
  opacity: 1;
  transition: opacity .3s ease;
  position: relative;
  
  ${({ hidden }) => hidden && `
     opacity: 0;
  `};
`;