import React, { ReactElement, PureComponent } from "react";
import { cssColors } from "src/styles/css";
import {
  Root,
  SvgPolyLine,
  ClippedGradient
} from "./styles";

interface LineChartGraphProps {
  percentageHeights: number[];
  showGradient?: boolean;
}

class LineChartGraph extends PureComponent<LineChartGraphProps> {
  render(): ReactElement {
    const { percentageHeights, showGradient  } =  this.props;

    // This draws a polygon mask on top of gradient background using percentage data
    // e.g: clip-path: polygon(5% 5%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
    const maskPolygonPoints = percentageHeights.map((percentageHeight, i) => (
      // Points order: "percetangeWidth% percentageHeight%", 0% is at top-left corner, so for height we need 1-height
      `${(100/percentageHeights.length)*(i+1)}% ${(1-percentageHeight)*100}%`
    ));

    const isDropping = percentageHeights[0] >= percentageHeights[percentageHeights.length - 1];
    const cornerPoints = isDropping
      ? ["100% 0%", `${(100/percentageHeights.length)}% 0%`]  // if dropping, corners on top
      : ["100% 100%", `${(100/percentageHeights.length)}% 100%`]; // if raising, corners at bottom
    const allMaskPolygonPoints = maskPolygonPoints.concat(cornerPoints);

    let polylinePoints = [];
    percentageHeights.forEach((percentage, i) => {
      const x = 100 / percentageHeights.length * (i + 1);
      const y = 100 - percentage * 100;
      polylinePoints = polylinePoints.concat(`${x},${y}`);
    });

    return (
      <Root>
        <SvgPolyLine
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={polylinePoints.join(" ")}
            strokeWidth={2}
            stroke={isDropping ? cssColors.colorBloodRed : cssColors.colorSoftGreen}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </SvgPolyLine>
        {showGradient && (
          <ClippedGradient
            polygonPoints={allMaskPolygonPoints.join(",")}
            isBad={isDropping}
          />
        )}

      </Root>
    );
  }
}

export default LineChartGraph;
