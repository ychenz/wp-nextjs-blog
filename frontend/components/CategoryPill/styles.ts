import styled from "styled-components";
import { getWPCategoryColor } from "services/string";
import { cssColors, cssVariables } from "src/styles/css";

export const CategoryLink = styled.a<{ categoryId: number, isActive: boolean }>`
  color: ${({ categoryId }) => getWPCategoryColor(categoryId)};
  border: 1px solid ${({ categoryId }) => getWPCategoryColor(categoryId)};
  border-radius: 4px;
  font-family: Sunflower, sans-serif;
  font-weight: ${cssVariables.mediumFontWeight};
  font-size: ${cssVariables.smallFontSize};
  line-height: 20px;
  cursor: pointer;
  padding: 0 ${cssVariables.uiUnit};
  margin-right: ${cssVariables.uiUnit};
  transition: .3s ease;
  
  ${({ isActive, categoryId }) => isActive && `
    background-color: ${getWPCategoryColor(categoryId)};
    color: ${cssColors.colorWhite};
  `}
  
  &:hover {
    background-color: ${({ categoryId }) => getWPCategoryColor(categoryId)};
    color: ${cssColors.colorWhite};
  }
`;