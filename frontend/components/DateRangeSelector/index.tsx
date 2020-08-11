import React from "react";

import {
  Root,
  DateRangeButton
} from "./styles";

export enum DateRanges {
  FiveDays= "5D",
  OneMonth= "1M",
  SixMonths= "6M",
  OneYear = "1Y",
  FiveYears= "5Y",
  TenYears= "10Y"
}

interface DateRangeSelectorProps {
  dateRange: DateRanges;
  onRangeSelected(dateRange: DateRanges): void;
}

class DateRangeSelector extends React.PureComponent<DateRangeSelectorProps> {
  componentDidMount(): void {
    const { dateRange, onRangeSelected } = this.props;

    if (!dateRange) {
      onRangeSelected(DateRanges.FiveDays); // Default select 5 days range
    }
  }

  render(): React.ReactElement {
    const { dateRange, onRangeSelected } = this.props;
    const allDateRanges = [
      DateRanges.FiveDays,
      DateRanges.OneMonth,
      DateRanges.SixMonths,
      DateRanges.OneYear,
      DateRanges.FiveYears,
      DateRanges.TenYears
    ];

    return (
      <Root>
        {allDateRanges.map(range => (
          <DateRangeButton
            isActive={range === dateRange}
            onClick={() => onRangeSelected(range)}
          >
            {range}
          </DateRangeButton>
        ))}
      </Root>
    );
  }
}

export default DateRangeSelector;