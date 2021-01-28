import React, { useState } from "react";

import {
  SectionSubTitle
} from "page-assets/portfolio-new/styles";
import * as S from "page-assets/portfolio-new/EmploymentHistorySection/styles";

export default function EmploymentHistorySection(): React.ReactElement {
  const [employmentIndex, setEmploymentIndex] = useState(0);

  const data = [
    {
      company: "Ada Support Inc.",
      startDate: "2019 Aug.",
      endDate: null,
      position: "Full-stack Developer",
      description: "Worked closely with designers to create a new version of the analytics dashboard product to give user better insight of their bot performance. The project involved building line chart & tables with customizable filters using ReactJS, HTML5 and SCSS."
    },
    {
      company: "Ada Support Inc.",
      startDate: "2018 Sep",
      endDate: "2018 Dec",
      position: "Full-stack Developer Intern",
      description: "Worked closely with designers to create a new version of the analytics dashboard product to give user better insight of their bot performance. The project involved building line chart & tables with customizable filters using ReactJS, HTML5 and SCSS."
    },
  ];

  const renderPagination = (): React.ReactElement => (
    <S.PaginationContainer>
      {data.map((_, i) => (
        <S.PaginationButton
          key={data[i].startDate}
          type="button"
          aria-label={`View Employment history ${i}`}
          onClick={(): void => setEmploymentIndex(i)}
        >
          <S.PaginationDot active={employmentIndex === i} />
        </S.PaginationButton>
      ))}
    </S.PaginationContainer>
  );

  return (
    <>
      <S.Root>
        <S.TitleContainer>
          <SectionSubTitle>{data[employmentIndex].company}</SectionSubTitle>
          <S.EmploymentDateText>
            {data[employmentIndex].startDate}
            {" - "}
            {data[employmentIndex].endDate || "Present" }
          </S.EmploymentDateText>
        </S.TitleContainer>
        <S.PositionText>{data[employmentIndex].position}</S.PositionText>
        <S.DescriptionText>{data[employmentIndex].description}</S.DescriptionText>
      </S.Root>
      {renderPagination()}
    </>
  );
}
