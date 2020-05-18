import styled from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";
import { getWPCategoryColor } from "services/string";

export const Root = styled.div`
  max-width: ${cssVariables.postContentMaxWidth};
  margin: auto;
`;

export const Title = styled.div`
  margin-top: 40px;
  font-family: Saira, sans-serif;
  font-weight: ${cssVariables.mediumFontWeight};
  font-size: ${cssVariables.xxxLargeFontSize};
  line-height: 48px;
  color: ${cssColors.colorTitle1};
`;

export const CategoryContainer = styled.div`
  margin: ${cssVariables.uiUnit} 0 40px 0;
  display: flex;
  align-items: center;
`;

export const CreationDate = styled.div`
  font-family: Sunflower, sans-serif;
  font-size: ${cssVariables.smallFontSize};
  line-height: 16px;
  color: ${cssColors.colorGray5};
  margin-right: ${cssVariables.uiUnitDouble};
`;

export const CategoryLink = styled.a<{ categoryId: number }>`
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
  
  &:hover {
    background-color: ${({ categoryId }) => getWPCategoryColor(categoryId)};
    color: ${cssColors.colorWhite};
  }
`;

export const Content = styled.div`
  & > p {
    font-family: Nunito, sans-serif;
    font-size: ${cssVariables.paragraphFontSize};
    line-height: ${cssVariables.paragraphLineHeight};
    color: ${cssColors.colorGray4};
    margin-bottom: 40px;
    padding: 0 ${cssVariables.uiUnit};
    text-align: justify;
  }
`;
