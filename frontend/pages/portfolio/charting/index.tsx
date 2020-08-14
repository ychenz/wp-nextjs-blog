import React, { PureComponent, ReactElement } from "react";
import Router from "next/router";
import moment from "moment";
import PageWrapper from "components/PageWrapper";
import LineChart, { TimeSeriesData } from "components/LineChart";
import DateRangeSelector, { DateRanges } from "components/DateRangeSelector";
import { fetcher, HttpResponse } from "services/httpRequest";
import { round } from "services/mathUtils";
import PieChartIcon from "static/images/PieChart.svg";
import ExchangeIcon from "static/images/Exchange.svg";
import ArrowUp from "static/images/ArrowUp.svg";
import ArrowDown from "static/images/ArrowDown.svg";
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

interface FMPCompanyProfileData {
  symbol: string;  // date in format YYYY-MM-DD HH:mm:ss
  price: number;
  companyName: string; // Apple Inc
  beta: number;
  volAvg: number;
  mktCap: string; // "1.37587904E12"
  lastDiv: number;
  range: string;
  changes:  number;
  changesPercentage: string; // "(+0.23)"
  exchange: string; // "Nasdaq Global Select"
  industry: string; // "Computer Hardware"
  website: string; // "http://www.apple.com"
  description: string;
  ceo: string;
  sector: string; // "Technology"
  image: string; // "https://financialmodelingprep.com/images-New-jpg/AAPL.jpg"
}

interface ChartingPropsFromServer {
  dateRange: DateRanges; // dateRange from query params
  stockSymbol: string; // stock symbol from query params
  stockDataList: FMPStockData[];
  companyProfile: FMPCompanyProfileData;
}

interface ChartingState {
  modalHidden: boolean;
}

class Charting extends PureComponent<ChartingPropsFromServer,ChartingState> {
  static async getInitialProps({ query }): Promise<{
    dateRange: DateRanges;
    stockDataList: FMPStockData[];
    companyProfile: FMPCompanyProfileData;
    stockSymbol: string;
  }> {
    const stockSymbol = query.symbol || "AAPL";

    const stockDataRes: HttpResponse<FMPStockData[]> = await fetcher({
      url: `https://financialmodelingprep.com/api/v3/historical-chart/30min/${stockSymbol}`,
      method: "GET",
      queryParams: {
        apikey: "68ea4a477785266e41b4ec5478fc6a1d"
      }
    });

    const profileRes: HttpResponse<FMPCompanyProfileData[]> = await fetcher({
      url: `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}`,
      method: "GET",
      queryParams: {
        apikey: "68ea4a477785266e41b4ec5478fc6a1d"
      }
    });

    return {
      dateRange: query.dateRange,
      stockSymbol: query.symbol,
      stockDataList: stockDataRes.parsedBody,
      companyProfile: profileRes.parsedBody[0]
    };
  }

  state = { modalHidden: true }

  componentDidMount(): void {
    const { stockSymbol, dateRange } = this.props;

    let queryParams = {};

    if (!stockSymbol) {
      queryParams = { symbol: "AAPL" };
    }

    if (!dateRange) {
      queryParams = {
        ...queryParams,
        dateRange: DateRanges.FiveDays
      };
    }

    if (!stockSymbol) {
      Router.push({
        pathname: ROUTE_PATH,
        query: queryParams
      });
    }
  }

  onRangeSelected = (dateRange: DateRanges): void => {
    const { stockSymbol } = this.props;

    Router.push({
      pathname: ROUTE_PATH,
      query: {
        dateRange,
        symbol: stockSymbol
      },
    });
  }

  handleModalToggle = (): void => {
    const { modalHidden } = this.state;

    this.setState({
      modalHidden: !modalHidden
    });
  }

  render(): ReactElement {
    const { stockDataList, companyProfile } = this.props;
    const { modalHidden } = this.state;

    // todo create loading screen
    if (!stockDataList || !companyProfile) {
      return <div>Loading Data ...</div>;
    }

    const { companyName, symbol, price, changes } = companyProfile;

    const currentDateTime = moment().format("MMM Do");
    const previousPrice = price - changes;
    const currentPrice = price;
    const priceChange = round(currentPrice - previousPrice, 2);
    const priceChangePercentage =round((currentPrice - previousPrice) * 100 / previousPrice, 2);

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
          <Ticker>{symbol}</Ticker>
          <DateStr>{currentDateTime}</DateStr>
        </HorizontalContainer>
        <HorizontalContainer marginTop={8}>
          <CurrentPriceText>{`$${currentPrice}`}</CurrentPriceText>
          <PriceChange isNegative={priceChange < 0}>
            {priceChange > 0 ? `+${priceChange}` : priceChange}
          </PriceChange>
          {priceChangePercentage < 0 ? <ArrowDown /> : <ArrowUp />}
          <PriceChange isNegative={priceChangePercentage < 0}>{`${priceChangePercentage}%`}</PriceChange>

          <DateRangeSelectorContainer>
            <DateRangeSelector
              dateRange={dateRange}
              onRangeSelected={this.onRangeSelected}
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