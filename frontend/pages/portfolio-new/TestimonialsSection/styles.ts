import styled from "styled-components";
import { cssVariables } from "src/styles/css";
import { marginContentToTopic } from "../styles";

const TestimonialsSection = styled.div`
  margin-top: ${marginContentToTopic};
`;

export const TestimonialEntry = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 64px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProviderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 64px;
  margin-bottom: 32px;
`;

export const ProviderAvatar = styled.div<{ imageUrl: string }>`
  width: 48px;
  height: 48px;
  margin-right: ${cssVariables.uiUnitDouble};
  border-radius: 50%;
  background-size:cover; 
  background-position:center center; 
  background-repeat:no-repeat; 
  background-image:url(${p => p.imageUrl});
`;

export const ProviderName = styled.a`
  margin-top: ${cssVariables.uiUnit};
  font-family: ${cssVariables.titleFontFamily};
  font-size: ${cssVariables.largeFontSize};
  font-weight: ${cssVariables.mediumFontWeight};
  line-height: 25px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
  
  &:focus, :active {
    color: black;
  }
`;

export const ProviderPosition = styled.div`
  margin-top: ${cssVariables.uiUnit};
  font-family: ${cssVariables.contentFontFamily};
  font-size: ${cssVariables.largeFontSize};
  line-height: 22px;
`;

export const TestimonialText = styled.div`
  max-width: 663px;
  font-family: ${cssVariables.contentFontFamily};
  font-size: ${cssVariables.largeFontSize};
  line-height: 22px;
`;

export const Root = TestimonialsSection;
