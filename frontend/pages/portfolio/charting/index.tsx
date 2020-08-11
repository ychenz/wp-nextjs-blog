import React, { PureComponent, ReactElement } from "react";
import Router, { useRouter } from "next/router";
import moment from "moment";
import PageWrapper from "components/PageWrapper";
import LineChart, { TimeSeriesData } from "components/LineChart";
import DateRangeSelector, { DateRanges } from "components/DateRangeSelector";
import PieChartIcon from "static/images/PieChart.svg";
import ExchangeIcon from "static/images/Exchange.svg";
import ArrowUp from "static/images/ArrowUp.svg";
import {
  Root,
  HorizontalContainer,
  IconContainer,
  Title,
  CompanyNameText,
  Ticker,
  DateStr,
  CurrentPriceText,
  PriceChange,
  DateRangeSelectorContainer
} from "./styles";
import testData from "./test_data.json";

const ROUTE_PATH = "/portfolio/charting";

interface PureComponentPropsFromServer {
  dateRange: DateRanges;
}

class Charting extends PureComponent<PureComponentPropsFromServer> {
  static async getInitialProps({ query }): Promise<{ dateRange: DateRanges }> {
    return { dateRange: query.dateRange };
  }

  static onRangeSelected(dateRange: DateRanges): void {
    Router.push({
      pathname: ROUTE_PATH,
      query: { dateRange },
    });
  }

  render(): ReactElement {
    const companyName = "Alphabet Inc Class A";
    const ticker = "GOOGL";
    const currentDateTime = "Jul. 24, 6:11 p.m. EDT";
    const previousPrice = 2680.24;
    const currentPrice = 2712.24;
    const priceChange = currentPrice - previousPrice;
    const priceChangePercentage = Math.round((currentPrice - previousPrice) * 1000 / previousPrice) / 10;

    const timeSeriesDataList: TimeSeriesData[] = testData.map(entry => ({
      timestamp: moment(entry.date, "YYYY-MM-DD HH:mm:ss").valueOf(),
      value: entry.close
    })).reverse(); // latest data should be at last

    const { dateRange } = this.props;

    return (
      <Root>
        <HorizontalContainer marginTop={48}>
          <IconContainer>
            <PieChartIcon/>
          </IconContainer>
          <Title>
            Advanced Charting
          </Title>
        </HorizontalContainer>

        <HorizontalContainer marginTop={48}>
          <CompanyNameText>{companyName}</CompanyNameText>
          <div>
            <ExchangeIcon/>
          </div>
        </HorizontalContainer>
        <HorizontalContainer marginTop={0}>
          <Ticker>{ticker}</Ticker>
          <DateStr>{currentDateTime}</DateStr>
        </HorizontalContainer>
        <HorizontalContainer marginTop={8}>
          <CurrentPriceText>{`$${currentPrice}`}</CurrentPriceText>
          <PriceChange isNegative={priceChange < 0}>
            {priceChange > 0 ? `+${priceChange}` : priceChange}
          </PriceChange>
          <ArrowUp/>
          <PriceChange isNegative={priceChangePercentage < 0}>{`${priceChangePercentage}%`}</PriceChange>

          <DateRangeSelectorContainer>
            <DateRangeSelector
              dateRange={dateRange}
              onRangeSelected={Charting.onRangeSelected}
            />
          </DateRangeSelectorContainer>
        </HorizontalContainer>

        <LineChart timeSeriesDataList={timeSeriesDataList}/>
      </Root>
    );
  }
}

export default PageWrapper(Charting);