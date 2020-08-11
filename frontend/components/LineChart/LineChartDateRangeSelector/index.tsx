import React from "react";

enum DateRanges {
  FiveDays= "5D",
  OneMonth= "1M",
  SixMonths= "6M",
  OneYear = "1Y",
  FiveYears= "5Y",
  TenYears= "10Y"
}

interface LineChartDateRangeSelectorProps {
  range: DateRanges
}

class LineChartDateRangeSelector extends React.PureComponent {

}

export default LineChartDateRangeSelector;