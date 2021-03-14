import React from "react";

import * as S from "./styles";

export default function TestimonialsSection(): React.ReactElement {
  const data = [
    {
      providerAvatar: "https://media-exp1.licdn.com/dms/image/C5603AQG6zRolUy0Heg/profile-displayphoto-shrink_200_200/0/1533091124401?e=1621468800&v=beta&t=xOJI4r3PrHJisLOK1ZtBhWX2M_Q4969czMo8BcfOpwQ",
      providerName: "Anson MacKeracher",
      providerPosition: "Software creator and entrepreneur",
      testimonialLink: "https://www.linkedin.com/in/amackera/",
      testimonial: "While working together at Ada, Yuchen greatly impressed me with his quick study, industriousness, and his continuing efforts to grow his skills. He rapidly became productive in our front end code, so much so that we were pleased to hire him full-time after his initial co-op term.\n" +
        "\nYuchen is a fast learner and a courteous professional. He's an asset to any team he's a part of.",
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
