import React, { PureComponent, ReactElement } from "react";
import Router from "next/router";
import moment from "moment";
import PageWrapper from "components/PageWrapper";
import LineChart, { TimeSeriesData } from "components/LineChart";
import DateRangeSelector, { DateRanges } from "components/DateRangeSelector";
import { fetcher, HttpResponse } from "services/httpRequest";
import PieChartIcon from "static/images/PieChart.svg";
import ExchangeIcon from "static/images/Exchange.svg";
import ArrowUp from "static/images/ArrowUp.svg";
import StockSelectionModal from "./StockSelectionModal";
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

interface FMPStockData {
  date: string;  // date in format YYYY-MM-DD HH:mm:ss
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

interface ChartingPropsFromServer {
  dateRange: DateRanges;
  stockDataList: FMPStockData[];
}

interface ChartingState {
  modalHidden: boolean;
}

class Charting extends PureComponent<ChartingPropsFromServer,ChartingState> {
  static async getInitialProps({ query }): Promise<{ dateRange: DateRanges; stockDataList: FMPStockData[] }> {
    const res: HttpResponse<FMPStockData[]> = await fetcher({
      url: "https://financialmodelingprep.com/api/v3/historical-chart/15min/AAPL",
      method: "GET",
      queryParams: {
        apikey: "demo"
      }
    });

    return {
      dateRange: query.dateRange,
      stockDataList: res.parsedBody
    };
  }

  static onRangeSelected(dateRange: DateRanges): void {
    Router.push({
      pathname: ROUTE_PATH,
      query: { dateRange },
    });
  }

  state = { modalHidden: true }

  handleModalToggle = (): void => {
    const { modalHidden } = this.state;

    this.setState({
      modalHidden: !modalHidden
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

    const { stockDataList } = this.props;
    const { modalHidden } = this.state;

    const timeSeriesDataList: TimeSeriesData[] = stockDataList.map(entry => ({
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
          <div onClick={this.handleModalToggle}>
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
        <StockSelectionModal hidden={modalHidden} onToggle={this.handleModalToggle} />
      </Root>
    );
  }
}

export default PageWrapper(Charting);