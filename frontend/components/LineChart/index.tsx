import React, { ReactElement } from "react";
import moment from "moment";
import { round } from "services/mathUtils";
import ArrowUp from "static/images/ArrowUp.svg";
import ArrowDown from "static/images/ArrowDown.svg";
import { X_LABEL_COUNT, Y_LABEL_COUNT, CHART_HEIGHT } from "./constants";
import LineChartGraph from "./LineChartGraph";

import {
  Root,
  LineChartFrame,
  FrameBackgroundGridLine,
  LineChartGraphContainer,
  YLabelsContainer,
  YLabelsText,
  XLabelContainer,
  XLabelsText,
  ColumnsContainer,
  Column,
  DataPoint,
  TooltipContainer,
  TooltipEntryContainer,
  TooltipValueText,
  TooltipDateText,
  TooltipPercentageChange,
  TooltipPercentageChangeIcon,
} from "./styles";

export interface TimeSeriesData {
  timestamp: number;
  value: number;
}

interface TooltipsConfig {
  x: number;
  y?: number;
  isInverted: boolean;
  mouseIsDown: boolean;
  startColumnIndex: number;
  endColumnIndex?: number;
}

interface LineChartState {
  tooltipData: {
    startData: TimeSeriesData[]; // columns data, length is the same as timeSeriesDataLists, contains only data for that index
    endData?: TimeSeriesData[]; // Same as above, should have same length as timeSeriesDataLists
    config: TooltipsConfig;
  };
}

interface LineChartProps {
  isTimeSeries?: boolean;
  timeSeriesDataLists: TimeSeriesData[][];
}

class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
  static isTooltipPriceDropping(startValue: number, endValue: number, config: TooltipsConfig): boolean {
    if (config.startColumnIndex < config.endColumnIndex) {
      return endValue <= startValue;
    }

    return endValue > startValue;
  }

  static isDropping(timeSeriesDataList: TimeSeriesData[]): boolean {
    return timeSeriesDataList[0].value >= timeSeriesDataList[timeSeriesDataList.length - 1].value;
  }

  state: LineChartState = {
    tooltipData: null
  }

  handleColumnMouseLeaveBound = this.handleColumnMouseLeave.bind(this);
  handleColumnMouseMoveBound = this.handleColumnMouseMove.bind(this);
  handleColumnMouseDownBound = this.handleColumnMouseDown.bind(this);
  handleColumnMouseUpBound = this.handleColumnMouseUp.bind(this);

  get xLabels(): string[] {
    const { timeSeriesDataLists } = this.props;
    // timestamp should be same for all dataset, we just take the 1st one here is sufficient
    const dataList1 = timeSeriesDataLists[0];

    const endTimestamp = dataList1[0].timestamp;
    const startTimestamp = dataList1[timeSeriesDataLists.length -1].timestamp;
    const duration = endTimestamp - startTimestamp;

    // we label X in the middle, so margin 1/2 of the in-between distance to the start and end, distance between labels
    // are as usual
    const timeSegment = duration / (X_LABEL_COUNT * 2);

    // From left (earlier) to right (later)
    return [...Array(X_LABEL_COUNT).keys()].map(
      i => moment(endTimestamp - timeSegment - i * 2 * timeSegment).format("M/D/YYYY H:mm")
    );
  }

  get yLabels(): string[] {
    const { timeSeriesDataLists } = this.props;
    // Combine all data to get the true max/min values
    const datalist = timeSeriesDataLists.reduce((list1, list2) => list1.concat(list2));

    const maxValue = Math.max(...datalist.map(data => data.value));
    const minValue = Math.min(...datalist.map(data => data.value));
    let maxLabel = Math.ceil(maxValue / 100) * 100; // round max up to nearest 100
    let minLabel = Math.floor(minValue / 100) * 100; // round min down to nearest 100

    if (maxValue < 100) {
      maxLabel = Math.ceil(maxValue / 10) * 10; // round max up to nearest 10
      minLabel = Math.floor(minValue / 10) * 10; // round min down to nearest 10
    }

    const labelDistance = (maxLabel - minLabel) / (Y_LABEL_COUNT - 1);

    // From max (top) to min (down)
    return [...Array(Y_LABEL_COUNT).keys()].map(
      i => (Math.round(maxLabel - i * labelDistance)).toString()
    );
  }

  handleColumnMouseEnter(event: React.MouseEvent<HTMLDivElement>, columnData: TimeSeriesData[], columnIndex: number): void {
    const { tooltipData } = this.state;

    const target = event.target as HTMLDivElement;
    const targetBoundingClientRect = target.getBoundingClientRect();
    const x = targetBoundingClientRect.right + 12; // tooltip is shown on the right of the vertical line (right border)
    const isInverted = x > window.innerWidth - 200; // Display tooltip on the other side of the line if its out of window
    let config: TooltipsConfig = {
      isInverted,
      x,
      mouseIsDown: false,
      startColumnIndex: columnIndex
    };

    let startTooltipsData: TimeSeriesData[] = columnData;
    let endTooltipsData: TimeSeriesData[] = null;

    // Update end column if user is dragging on the chart (mouse is pressed down)
    if (tooltipData && tooltipData.config && tooltipData.config.mouseIsDown) {
      startTooltipsData = tooltipData.startData;
      endTooltipsData = columnData;
      config = {
        ...config,
        mouseIsDown: tooltipData.config.mouseIsDown,
        startColumnIndex: tooltipData.config.startColumnIndex,
        endColumnIndex: columnIndex
      };
    }

    this.setState({
      tooltipData: {
        startData: startTooltipsData,
        endData: endTooltipsData,
        config
      }
    });
  }

  handleColumnMouseMove(event: React.MouseEvent): void {
    const { clientY } = event;

    this.setState(prevState => ({
      tooltipData: {
        ...prevState.tooltipData,
        config: {
          ...prevState.tooltipData.config,
          y: clientY
        }
      }
    }));
  }

  handleColumnMouseLeave(): void {
    this.setState({
      tooltipData: null
    });
  }

  handleColumnMouseDown(columnData: TimeSeriesData[], columnIndex: number): void{
    this.setState(prevState => ({
      tooltipData: {
        startData: prevState.tooltipData.startData,
        endData: columnData,
        config: {
          ...prevState.tooltipData.config,
          endColumnIndex: columnIndex,
          mouseIsDown: true
        }
      }
    }));
  }

  handleColumnMouseUp(): void{
    this.setState(prevState => ({
      tooltipData: {
        startData: prevState.tooltipData.endData,
        endData: null,
        config: {
          ...prevState.tooltipData.config,
          endColumnIndex: null,
          startColumnIndex: prevState.tooltipData.config.endColumnIndex,
          mouseIsDown: false
        }
      }
    }));
  }

  renderXLabels(): ReactElement {
    return (
      <XLabelContainer>
        {[...Array(X_LABEL_COUNT).keys()].map(i => (
          <XLabelsText key={i}>
            {this.xLabels[i]}
          </XLabelsText>
        ))}
      </XLabelContainer>
    );
  }

  renderYLabels(): ReactElement {
    return (
      <YLabelsContainer>
        {[...Array(Y_LABEL_COUNT).keys()].map(i => (
          <YLabelsText key={i} count={i}>
            {this.yLabels[i]}
          </YLabelsText>
        ))}
      </YLabelsContainer>
    );
  }

  render(): ReactElement {
    const { timeSeriesDataLists } = this.props;
    const { tooltipData } = this.state;
    const { yLabels } = this;

    if (!timeSeriesDataLists) {
      return <div>Loading</div>;
    }

    // Consider height of the chart is 100%, this calculates a list of percentage of height of each points
    const percentageHeightsList = timeSeriesDataLists.map(timeSeriesDataList => timeSeriesDataList.map(data => (
      (data.value - parseInt(yLabels[Y_LABEL_COUNT - 1], 10)) /
      (parseInt(yLabels[0], 10) - parseInt(yLabels[Y_LABEL_COUNT - 1], 10))
    )));

    const dataList1 = timeSeriesDataLists[0];
    const stockDataColumns: TimeSeriesData[][] = []; // data in columns

    dataList1.forEach((data, i) => {
      stockDataColumns.push(timeSeriesDataLists.map(timeSeriesDataList => timeSeriesDataList[i]));
    });

    return (
      <Root>
        {this.renderYLabels()}

        <LineChartFrame>
          <ColumnsContainer>
            {stockDataColumns.map((stockDataColumn, i) => (
              <Column
                key={stockDataColumn[0].timestamp}
                count={dataList1.length}
                onMouseEnter={e => this.handleColumnMouseEnter(e, stockDataColumn, i)}
                onMouseMove={this.handleColumnMouseMoveBound}
                onMouseLeave={this.handleColumnMouseLeaveBound}
                onMouseDown={() => this.handleColumnMouseDownBound(stockDataColumn, i)}
                onMouseUp={this.handleColumnMouseUpBound}
                isActive={tooltipData && tooltipData.config && tooltipData.config.startColumnIndex === i}
              >
                {
                  timeSeriesDataLists.map(timeSeriesDataList => (
                    <DataPoint
                      style={{
                        // Here we must put dynamic style here to prevent styled component generate too many classes
                        bottom: (
                          (timeSeriesDataList[i].value - parseInt(yLabels[Y_LABEL_COUNT - 1], 10)) /
                          (parseInt(yLabels[0], 10) - parseInt(yLabels[Y_LABEL_COUNT - 1], 10))
                        ) * CHART_HEIGHT - 6
                      }}
                      isBad={LineChart.isDropping(timeSeriesDataList)}
                    />
                  ))
                }
              </Column>
            ))}
          </ColumnsContainer>
          {  // We do not draw last line to prevent overlapping with the background frame
            [...Array(Y_LABEL_COUNT - 1).keys()].map(i => (
              <FrameBackgroundGridLine key={i} count={i} />
            ))
          }

          {
            percentageHeightsList.map(percentageHeights => (
              <LineChartGraphContainer>
                <LineChartGraph
                  percentageHeights={percentageHeights}
                  showGradient={percentageHeightsList.length === 1}
                />
              </LineChartGraphContainer>
            ))
          }
        </LineChartFrame>

        {this.renderXLabels()}

        {tooltipData && (
          <TooltipContainer
            style={{ top: tooltipData.config.y, left: tooltipData.config.x }}
            isInverted={tooltipData.config.isInverted}
          >
            {
              tooltipData.startData && tooltipData.startData.map((stockData, i) => (
                <>
                  <TooltipEntryContainer>
                    <TooltipValueText>
                      {`$${round(
                        tooltipData.config.mouseIsDown ? tooltipData.endData[i].value : stockData.value, 2
                      )}`}
                    </TooltipValueText>
                    <TooltipDateText>{moment(stockData.timestamp).format("MMM Do YYYY, H:mm")}</TooltipDateText>
                  </TooltipEntryContainer>

                  {tooltipData.endData && (
                    <TooltipPercentageChange isBad={
                      LineChart.isTooltipPriceDropping(
                        stockData.value,
                        tooltipData.endData[i].value,
                        tooltipData.config
                      )
                    }>
                      <div>
                        {
                          tooltipData.config.startColumnIndex <= tooltipData.config.endColumnIndex ? (
                            `${round(tooltipData.endData[i].value - stockData.value, 2)}`
                          ) : `${round(stockData.value - tooltipData.endData[i].value, 2)}`
                        }
                      </div>
                      <TooltipPercentageChangeIcon>
                        {LineChart.isTooltipPriceDropping(
                          stockData.value,
                          tooltipData.endData[i].value,
                          tooltipData.config
                        ) ? (
                          <ArrowDown width={12} height={12}/>
                        ) : (
                          <ArrowUp width={12} height={12}/>
                        )
                        }
                      </TooltipPercentageChangeIcon>
                      <div>
                        {
                          tooltipData.config.startColumnIndex <= tooltipData.config.endColumnIndex ? (
                            `(${round((
                              tooltipData.endData[i].value - stockData.value) * 100 /stockData.value,2
                            )}%)`
                          ) : `(${round((
                            stockData.value - tooltipData.endData[i].value) * 100 /tooltipData.endData[i].value,2
                          )}%)`
                        }
                      </div>
                    </TooltipPercentageChange>
                  )}
                </>
              ))
            }
          </TooltipContainer>
        )}
      </Root>
    );
  }
}

export default LineChart;
