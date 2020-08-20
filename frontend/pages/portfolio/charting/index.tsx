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
const FMP_API_KEY = "68ea4a477785266e41b4ec5478fc6a1d";
// const FMP_API_KEY = "demo";

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
  queryParams: {
    dateRange: DateRanges; // dateRange from query params
    symbol: string; // stock symbol from query params
    symbol2?: string; // stock symbol from query params
  };
  stockDataLists: TimeSeriesData[][];
  companyProfile: FMPCompanyProfileData;
}

interface ChartingState {
  modalHidden: boolean;
}

class Charting extends PureComponent<ChartingPropsFromServer,ChartingState> {
  static getReducedStockData(stockDataList: TimeSeriesData[], factor: number): TimeSeriesData[] {
    // Retain 1 entry for every 7
    return stockDataList.filter((data, i ) => i % factor === 0);
  }

  static filterStockDataByDateRange(stockDataList: TimeSeriesData[], dateRange: DateRanges): TimeSeriesData[] {
    const latestTimestamp = stockDataList[0].timestamp;
    let msToSubtract;
    const msInADay = 86400000;
    let filteredStockData = stockDataList;

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
        // Getting weekly data
        filteredStockData = Charting.getReducedStockData(stockDataList, 7);
        break;
      case DateRanges.TenYears:
        msToSubtract = 10 * 365 * msInADay;
        filteredStockData = Charting.getReducedStockData(stockDataList, 7);
        break;
      default:
    }

    return filteredStockData.filter(data => data.timestamp > latestTimestamp - msToSubtract);
  }

  static async fetchStockData(symbol: string, dateRange: DateRanges): Promise<TimeSeriesData[]> {
    // Fetch 30 min interval data for shorter date range: 5D, 1M
    if (dateRange === DateRanges.FiveDays || dateRange === DateRanges.OneMonth) {
      const stockDataRes: HttpResponse<FMPStockData[]> = await fetcher<FMPStockData[]>({
        url: `https://financialmodelingprep.com/api/v3/historical-chart/30min/${symbol}`,
        method: "GET",
        queryParams: {
          apikey: FMP_API_KEY
        }
      });

      return stockDataRes.parsedBody.map(entry => ({
        timestamp: moment(entry.date, "YYYY-MM-DD HH:mm:ss").valueOf(),
        value: entry.close
      }));
    }

    // Fetch 1 day interval data for longer date range
    const stockDataRes: HttpResponse<FMPStockDataDaily> = await fetcher<FMPStockDataDaily>({
      url: `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`,
      method: "GET",
      queryParams: {
        apikey: FMP_API_KEY,
        serietype: "line"
      }
    });

    return stockDataRes.parsedBody.historical.map(entry => ({
      timestamp: moment(entry.date, "YYYY-MM-DD").valueOf(),
      value: entry.close
    }));
  }

  /**
   * Server side function that initializes page data
   *
   * @param {Object} query Router query parameters
   */
  static async getInitialProps({ query }): Promise<{
    stockDataLists: TimeSeriesData[][];
    companyProfile: FMPCompanyProfileData;
    queryParams: {
      dateRange?: DateRanges; // dateRange from query params
      symbol?: string; // stock symbol from query params
      symbol2?: string; // stock symbol from query params
    };
  }> {
    /**
     * Possible query params:
     *   symbol: string;
     *   symbol2?: string;
     *   dateRange: DateRanges;
     */
    const stockSymbol = query.symbol || "AAPL";
    const stockSymbol2 = query.symbol2;

    const dateRange: DateRanges = query.dateRange || DateRanges.FiveDays;
    const stockDataLists: TimeSeriesData[][] = [];

    const stockData: TimeSeriesData[] = await Charting.fetchStockData(stockSymbol, dateRange);
    stockDataLists.push(stockData);

    if (stockSymbol2) {
      stockDataLists.push(await Charting.fetchStockData(stockSymbol2, dateRange));
    }

    const profileRes: HttpResponse<FMPCompanyProfileData[]> = await fetcher<FMPCompanyProfileData[]>({
      url: `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}`,
      method: "GET",
      queryParams: {
        apikey: FMP_API_KEY
      }
    });

    let stockDataListsCorrectOrder = stockDataLists.map(
      stockDataList => Charting.filterStockDataByDateRange(stockDataList, dateRange).reverse()
    );

    if (stockSymbol2) {
      // convert from stock prices to $10000 investment results
      stockDataListsCorrectOrder = stockDataListsCorrectOrder.map(stockDataList => stockDataList.map(data => {
        const sharesBought = 10000 / stockDataList[0].value;

        return {
          timestamp: data.timestamp,
          value: sharesBought * data.value  // # of shares x price
        };
      }));
    }

    return {
      queryParams: {
        symbol: stockSymbol,
        symbol2: stockSymbol2,
        dateRange
      },
      stockDataLists: stockDataListsCorrectOrder,
      companyProfile: profileRes.parsedBody[0]
    };
  }

  state = { modalHidden: true }

  componentDidMount(): void {
    const { queryParams } = this.props;

    let queryParamsNew = queryParams;

    if (!queryParams.symbol) {
      queryParamsNew.symbol = "AAPL";
    }

    if (!queryParams.dateRange) {
      queryParamsNew = {
        ...queryParamsNew,
        dateRange: DateRanges.FiveDays
      };
    }

    if (!queryParams.symbol) {
      Router.push({
        pathname: ROUTE_PATH,
        query: queryParamsNew
      });
    }
  }

  onRangeSelected = (dateRange: DateRanges): void => {
    const { queryParams } = this.props;

    Router.push({
      pathname: ROUTE_PATH,
      query: {
        ...queryParams,
        dateRange
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
    const { queryParams, stockDataLists, companyProfile } = this.props;
    const { modalHidden } = this.state;

    // todo create loading screen
    if (!stockDataLists || !companyProfile) {
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
              dateRange={queryParams.dateRange}
              onRangeSelected={this.onRangeSelected}
            />
          </DateRangeSelectorContainer>
        </HorizontalContainer>

        <LineChart timeSeriesDataLists={stockDataLists}/>
        <StockSelectionModal hidden={modalHidden} onToggle={this.handleModalToggle} />
      </Root>
    );
  }
}

export default PageWrapper(Charting);