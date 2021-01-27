import React from "react";

import { SectionContent } from "../styles";
import * as S from "./styles";

export function TestimonialsSection(): React.ReactElement {
  const data = [
    {
      providerAvatar: "https://i.pinimg.com/originals/12/81/01/128101caae845d451425fd1ac767d3a0.jpg",
      providerName: "Yuchen Zhao",
      providerPosition: "Full-stack Developer",
      testimonialLink: "https://www.linkedin.com/",
      testimonial: "Test text: Since 2018, I have been working for Ada as a web developer and the projects I built have assisted the company to grow its revenue by 100% from 2018 to year end 2020. I am specialized in building front-end applications using React & Redux to implement design solutions that satisfy complex user requirements. I strive to write high performance code that is highly modular and maintainable.",
    },
    {
      providerAvatar: "https://i.pinimg.com/originals/12/81/01/128101caae845d451425fd1ac767d3a0.jpg",
      providerName: "Yuchen Zhao",
      providerPosition: "Full-stack Developer",
      testimonialLink: "https://www.linkedin.com/",
      testimonial: "Test text: Since 2018, I have been working for Ada as a web developer and the projects I built have assisted the company to grow its revenue by 100% from 2018 to year end 2020. I am specialized in building front-end applications using React & Redux to implement design solutions that satisfy complex user requirements. I strive to write high performance code that is highly modular and maintainable.",
    },
  ];

  return (
    <S.Root>
      {data.map(item => (
        <S.TestimonialEntry>
          <S.ProviderContainer>
            <S.ProviderAvatar imageUrl={item.providerAvatar} />
            <div>
              <S.ProviderName
                href={item.testimonialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.providerName}
              </S.ProviderName>
              <S.ProviderPosition>
                {item.providerPosition}
              </S.ProviderPosition>
            </div>
          </S.ProviderContainer>
          <S.TestimonialText>
            {item.testimonial}
          </S.TestimonialText>
        </S.TestimonialEntry>
      ))}

    </S.Root>
  );
}
