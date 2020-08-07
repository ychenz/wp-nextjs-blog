import React, { ReactElement } from "react";
import moment from "moment";
import LineChartGraph from "./LineChartGraph";
import { X_LABEL_COUNT, Y_LABEL_COUNT, CHART_HEIGHT } from "./constants";
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
  TooltipDateText
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

interface LineChartState {
  tooltipData: TooltipData;
}

interface LineChartProps {
  isTimeSeries?: boolean;
  timeSeriesDataList: TimeSeriesData[]
}

class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
  state: LineChartState = {
    tooltipData: null
  }

  handleColumnMouseLeaveBound = this.handleColumnMouseLeave.bind(this);
  handleColumnMouseMoveBound = this.handleColumnMouseMove.bind(this);

  get xLabels(): string[] {
    const { timeSeriesDataList } = this.props;
    const endTimestamp = timeSeriesDataList[0].timestamp;
    const startTimestamp = timeSeriesDataList[timeSeriesDataList.length -1].timestamp;
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
    const { timeSeriesDataList } = this.props;

    const maxValue = Math.max(...timeSeriesDataList.map(data => data.value));
    const minValue = Math.min(...timeSeriesDataList.map(data => data.value));
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

  get isDropping(): boolean {
    const { timeSeriesDataList } = this.props;

    return timeSeriesDataList[0].value >= timeSeriesDataList[timeSeriesDataList.length - 1].value;
  }

  handleColumnMouseEnter(event: React.MouseEvent<HTMLDivElement>, columnData: TimeSeriesData): void {
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
      }
    })
  }

  handleColumnMouseMove(event: React.MouseEvent): void {
    const { clientY } = event;

    this.setState(prevState => ({
      tooltipData: {
        ...prevState.tooltipData,
        y: clientY
      }
    }))
  }

  handleColumnMouseLeave(): void {
    this.setState({
      tooltipData: null
    })
  }

  render(): ReactElement {
    const { timeSeriesDataList } = this.props;
    const { tooltipData } = this.state;
    const { yLabels } = this;

    if (!timeSeriesDataList) {
      return <div>Loading</div>;
    }

    // Consider height of the chart is 100%, this calculates a list of percentage of height of each points
    const percentageHeights = timeSeriesDataList.map(data => (
      (data.value - parseInt(yLabels[Y_LABEL_COUNT - 1], 10)) /
      (parseInt(yLabels[0], 10) - parseInt(yLabels[Y_LABEL_COUNT - 1], 10))
    ));

    return (
      <Root>
        <YLabelsContainer>
          {[...Array(Y_LABEL_COUNT).keys()].map(i => (
            <YLabelsText key={i} count={i}>
              {this.yLabels[i]}
            </YLabelsText>
          ))}
        </YLabelsContainer>

        <LineChartFrame>
          <ColumnsContainer>
            {timeSeriesDataList.map(data => (
              <Column
                key={data.timestamp}
                count={timeSeriesDataList.length}
                onMouseEnter={e => this.handleColumnMouseEnter(e, data)}
                onMouseMove={this.handleColumnMouseMoveBound}
                onMouseLeave={this.handleColumnMouseLeaveBound}
              >
                <DataPoint
                  height={
                    (
                      (data.value - parseInt(yLabels[Y_LABEL_COUNT - 1], 10)) /
                      (parseInt(yLabels[0], 10) - parseInt(yLabels[Y_LABEL_COUNT - 1], 10))
                    ) * CHART_HEIGHT
                  }
                  isBad={this.isDropping}
                />
              </Column>
            ))}
          </ColumnsContainer>
          {  // We do not draw last line to prevent overlapping with the background frame
            [...Array(Y_LABEL_COUNT - 1).keys()].map(i => (
              <FrameBackgroundGridLine key={i} count={i} />
            ))
          }
          <LineChartGraphContainer>
            <LineChartGraph
              percentageHeights={percentageHeights}
              showGradient
            />
          </LineChartGraphContainer>
        </LineChartFrame>

        <XLabelContainer>
          {[...Array(X_LABEL_COUNT).keys()].map(i => (
            <XLabelsText key={i}>
              {this.xLabels[i]}
            </XLabelsText>
          ))}
        </XLabelContainer>

        {tooltipData && (
          <TooltipContainer
            style={{ top: tooltipData.y, left: tooltipData.x}}
            isInverted={tooltipData.isInverted}
          >
            <TooltipValueText>{`$${Math.round(tooltipData.value*100)/100}`}</TooltipValueText>
            <TooltipDateText>{moment(tooltipData.timestamp).format("MMM Do YYYY, H:mm")}</TooltipDateText>
          </TooltipContainer>
        )}
      </Root>
    );
  }
}

export default LineChart;
