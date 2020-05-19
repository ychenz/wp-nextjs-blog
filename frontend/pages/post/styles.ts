import styled, { keyframes } from "styled-components";
import { cssColors, cssVariables } from "src/styles/css";
import { getWPCategoryColor } from "services/string";

const animFadeIn = keyframes`
  from { opacity: 0; }

  to { opacity: 1; }
`;

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
  color: ${cssColors.colorGray4};
  animation: ${animFadeIn} 0.2s;
  padding: 0 ${cssVariables.uiUnit};
`;

export const CategoryContainer = styled.div`
  margin: ${cssVariables.uiUnit} 0 40px 0;
  display: flex;
  align-items: center;
  animation: ${animFadeIn} 0.5s;
  padding: 0 ${cssVariables.uiUnit};
`;

export const FeaturedImage = styled.figure`
  margin: 24px 0 32px;
  animation: ${animFadeIn} 0.5s;

  & > img {
    max-width:100%;
    height:auto;
    max-height: 750px;
  }
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
  animation: ${animFadeIn} 1s;
  padding: 0 ${cssVariables.uiUnit};
  font-family: Nunito, sans-serif;

  & p {
    font-size: ${cssVariables.paragraphFontSize};
    line-height: ${cssVariables.paragraphLineHeight};
    color: ${cssColors.colorGray4};
    margin-bottom: 32px;
    text-align: justify;
  }
  
  & > h2 {
    margin: 8px 0;
    font-family: Saira, sans-serif;
    font-weight: ${cssVariables.heavyFontWeight};
    font-size: ${cssVariables.xxLargeFontSize};
    line-height: ${cssVariables.paragraphLineHeight};
    color: ${cssColors.colorBlack};
  }
  
  & > h3 {
    margin: 8px 0;
    font-family: Saira, sans-serif;
    font-weight: ${cssVariables.heavyFontWeight};
    font-size: ${cssVariables.paragraphFontSize};
    line-height: ${cssVariables.paragraphLineHeight};
    color: ${cssColors.colorBlack};
  }
  
  & a {
    color: ${cssColors.colorModernBlue};
    text-decoration: underline;
    
    &:hover {
      color: ${cssColors.colorUiPrimary};
    }
  }
  
  & ul {
    list-style: square;
    margin-bottom: 32px
  }
  
  & ol {
     margin-bottom: 32px;
  }
  
  & li {
    font-size: ${cssVariables.paragraphFontSize};
    line-height: ${cssVariables.paragraphLineHeight};
    color: ${cssColors.colorGray4};
    text-align: justify;
    margin-bottom: 24px;
  }
  
  & .wp-block-code {
    padding: 16px;
    background-color: ${cssColors.colorGray3};
    font-size: ${cssVariables.largeFontSize};
    line-height: 20px;
    color: ${cssColors.colorGray4};
    margin-bottom: 32px;
    overflow-x: auto;
  }
  
  & figure {
    margin: 16px -${cssVariables.uiUnit} 32px; // The image should fill horizontally on small screen

    & > img {
      max-width:100%;
      height:auto;
    }

    & > figcaption {
      margin-top: ${cssVariables.uiUnit};
      font-family: Saira, sans-serif;
      text-align: center;
      color: ${cssColors.colorGray5};
      font-size: ${cssVariables.mediumFontSize};
      line-height: 16px;
      font-weight: 400;
    }
  }
`;
