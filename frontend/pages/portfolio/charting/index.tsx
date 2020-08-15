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
// const FMP_API_KEY = "68ea4a477785266e41b4ec5478fc6a1d";
const FMP_API_KEY = "demo";

interface FMPStockData {
  date: string;  // date in format YYYY-MM-DD HH:mm:ss
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

interface FMPStockDataDaily {
  symbol: string;
  historical: {
    date: string; // e.g: "2020-08-14"
    close: number;
  }[];
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
  stockDataList: TimeSeriesData[];
  companyProfile: FMPCompanyProfileData;
}

interface ChartingState {
  modalHidden: boolean;
}

class Charting extends PureComponent<ChartingPropsFromServer,ChartingState> {
  static filterStockDataByDateRange(stockDataList: TimeSeriesData[], dateRange: DateRanges): TimeSeriesData[] {
    const latestTimestamp = stockDataList[0].timestamp;
    let msToSubtract;
    const msInADay = 86400000;

    switch (dateRange) {
      case DateRanges.FiveDays:
        msToSubtract = 5 * msInADay;
        break;
      case DateRanges.OneMonth:
        msToSubtract = 30 * msInADay;
        break;
      case DateRanges.SixMonths:
        msToSubtract = 180 * msInADay;
        break;
      case DateRanges.OneYear:
        msToSubtract = 365 * msInADay;
        break;
      case DateRanges.FiveYears:
        msToSubtract = 5 * 365 * msInADay;
        break;
      case DateRanges.TenYears:
        msToSubtract = 10 * 365 * msInADay;
        break;
      default:
    }

    return stockDataList.filter(data => data.timestamp > latestTimestamp - msToSubtract);
  }

  static async getInitialProps({ query }): Promise<{
    dateRange: DateRanges;
    stockDataList: TimeSeriesData[];
    companyProfile: FMPCompanyProfileData;
    stockSymbol: string;
  }> {
    const stockSymbol = query.symbol || "AAPL";
    const dateRange: DateRanges = query.dateRange || DateRanges.FiveDays;
    let stockDataList: TimeSeriesData[];

    // Fetch 30 min interval data for shorter date range: 5D, 1M
    if (dateRange === DateRanges.FiveDays || dateRange === DateRanges.OneMonth) {
      const stockDataRes: HttpResponse<FMPStockData[]> = await fetcher<FMPStockData[]>({
        url: `https://financialmodelingprep.com/api/v3/historical-chart/30min/${stockSymbol}`,
        method: "GET",
        queryParams: {
          apikey: FMP_API_KEY
        }
      });

      stockDataList = stockDataRes.parsedBody.map(entry => ({
        timestamp: moment(entry.date, "YYYY-MM-DD HH:mm:ss").valueOf(),
        value: entry.close
      })); // latest data should be at last
    } else {
      // Fetch 1 day interval data for longer date range
      const stockDataRes: HttpResponse<FMPStockDataDaily> = await fetcher<FMPStockDataDaily>({
        url: `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol}`,
        method: "GET",
        queryParams: {
          apikey: FMP_API_KEY,
          serietype: "line"
        }
      });

      stockDataList = stockDataRes.parsedBody.historical.map(entry => ({
        timestamp: moment(entry.date, "YYYY-MM-DD").valueOf(),
        value: entry.close
      }));
    }

    const profileRes: HttpResponse<FMPCompanyProfileData[]> = await fetcher<FMPCompanyProfileData[]>({
      url: `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}`,
      method: "GET",
      queryParams: {
        apikey: FMP_API_KEY
      }
    });

    stockDataList = Charting.filterStockDataByDateRange(stockDataList, dateRange).reverse(); // latest data should be at last

    return {
      dateRange: query.dateRange,
      stockSymbol: query.symbol,
      stockDataList,
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
    const { dateRange, stockDataList, companyProfile } = this.props;
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

        <LineChart timeSeriesDataList={stockDataList}/>
        <StockSelectionModal hidden={modalHidden} onToggle={this.handleModalToggle} />
      </Root>
    );
  }
}

export default PageWrapper(Charting);