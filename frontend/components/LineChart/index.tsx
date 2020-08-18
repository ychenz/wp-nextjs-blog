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
  TooltipValueText,
  TooltipDateText,
  TooltipPercentageChange,
  TooltipPercentageChangeIcon,
} from "./styles";

export interface TimeSeriesData {
  timestamp: number;
  value: number;
}

interface TooltipData {
  x: number;
  y?: number;
  isInverted: boolean;
  value: number;
  timestamp: number;
}

interface DragRangeData {
  mouseIsDown: boolean;
  activeColumnIndex: number;
  endColumnIndex?: number;
  startValue: number;
  endValue?: number;
}

interface LineChartState {
  tooltipData: TooltipData;
  dragRangeData: DragRangeData;
}

interface LineChartProps {
  isTimeSeries?: boolean;
  timeSeriesDataLists: TimeSeriesData[][];
}

class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
  static isTooltipPriceDropping(dragRangeData: DragRangeData): boolean {
    if (dragRangeData.activeColumnIndex < dragRangeData.endColumnIndex) {
      return dragRangeData.endValue <= dragRangeData.startValue;
    }

    return dragRangeData.endValue > dragRangeData.startValue;
  }

  static isDropping(timeSeriesDataList: TimeSeriesData[]): boolean {
    return timeSeriesDataList[0].value >= timeSeriesDataList[timeSeriesDataList.length - 1].value;
  }

  state: LineChartState = {
    tooltipData: null,
    dragRangeData: null
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

  handleColumnMouseEnter(event: React.MouseEvent<HTMLDivElement>, columnData: TimeSeriesData, columnIndex: number): void {
    const { dragRangeData } = this.state;

    let dragRangeDataModified: DragRangeData = null;

    if (dragRangeData && dragRangeData.mouseIsDown) {
      dragRangeDataModified = {
        ...dragRangeData,
        endValue: columnData.value,
        endColumnIndex: columnIndex
      };
    }

    const target = event.target as HTMLDivElement;
    const targetBoundingClientRect = target.getBoundingClientRect();
    const x = targetBoundingClientRect.right + 12; // tooltip is shown on the right of the vertical line (right border)
    const isInverted = x > window.innerWidth - 200; // Display tooltip on the other side of the line if its out of window

    this.setState({
      tooltipData: {
        value: columnData.value,
        timestamp: columnData.timestamp,
        x,
        isInverted
      },
      dragRangeData: dragRangeDataModified
    });
  }

  handleColumnMouseMove(event: React.MouseEvent): void {
    const { clientY } = event;

    this.setState(prevState => ({
      tooltipData: {
        ...prevState.tooltipData,
        y: clientY
      }
    }));
  }

  handleColumnMouseLeave(): void {
    this.setState({
      tooltipData: null
    });
  }

  handleColumnMouseDown(columnData: TimeSeriesData, columnIndex: number): void{
    this.setState({
      dragRangeData: {
        mouseIsDown: true,
        startValue: columnData.value,
        activeColumnIndex: columnIndex
      }
    });
  }

  handleColumnMouseUp(): void{
    this.setState({
      dragRangeData: null
    });
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
    const { tooltipData, dragRangeData } = this.state;
    const { yLabels } = this;
    const dataList1 = timeSeriesDataLists[0];

    if (!timeSeriesDataLists) {
      return <div>Loading</div>;
    }

    // Consider height of the chart is 100%, this calculates a list of percentage of height of each points
    const percentageHeightsList = timeSeriesDataLists.map(timeSeriesDataList => timeSeriesDataList.map(data => (
      (data.value - parseInt(yLabels[Y_LABEL_COUNT - 1], 10)) /
      (parseInt(yLabels[0], 10) - parseInt(yLabels[Y_LABEL_COUNT - 1], 10))
    )));

    return (
      <Root>
        {this.renderYLabels()}

        <LineChartFrame>
          <ColumnsContainer>
            {dataList1.map((data, i) => (
              <Column
                key={data.timestamp}
                count={dataList1.length}
                onMouseEnter={e => this.handleColumnMouseEnter(e, data, i)}
                onMouseMove={this.handleColumnMouseMoveBound}
                onMouseLeave={this.handleColumnMouseLeaveBound}
                onMouseDown={() => this.handleColumnMouseDownBound(data, i)}
                onMouseUp={this.handleColumnMouseUpBound}
                isActive={dragRangeData && dragRangeData.activeColumnIndex === i}
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
            style={{ top: tooltipData.y, left: tooltipData.x }}
            isInverted={tooltipData.isInverted}
          >
            {dragRangeData && dragRangeData.endValue && (
              <TooltipPercentageChange isBad={LineChart.isTooltipPriceDropping(dragRangeData)}>
                <div>
                  {
                    dragRangeData.activeColumnIndex <= dragRangeData.endColumnIndex ? (
                      `${round(dragRangeData.endValue - dragRangeData.startValue, 2)}`
                    ) : `${round(dragRangeData.startValue - dragRangeData.endValue, 2)}`
                  }
                </div>
                <TooltipPercentageChangeIcon>
                  {LineChart.isTooltipPriceDropping(dragRangeData) ? (
                      <ArrowDown width={12} height={12}/>
                    ) : (
                      <ArrowUp width={12} height={12}/>
                    )
                  }
                </TooltipPercentageChangeIcon>
                <div>
                  {
                    dragRangeData.activeColumnIndex <= dragRangeData.endColumnIndex ? (
                      `(${round((
                        dragRangeData.endValue - dragRangeData.startValue) * 100 /dragRangeData.startValue,2
                      )}%)`
                    ) : `(${round((
                      dragRangeData.startValue - dragRangeData.endValue) * 100 /dragRangeData.endValue,2
                    )}%)`
                  }
                </div>
              </TooltipPercentageChange>
            )}
            <TooltipValueText>{`$${round(tooltipData.value, 2)}`}</TooltipValueText>
            <TooltipDateText>{moment(tooltipData.timestamp).format("MMM Do YYYY, H:mm")}</TooltipDateText>
          </TooltipContainer>
        )}
      </Root>
    );
  }
}

export default LineChart;
