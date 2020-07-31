import React from "react";
import { cssColors } from "src/styles/css";

interface CategoryPillProps {
  icon: string;
  fillColor?: string;
  viewBox?: string;
  size: number;
}

class SvgIcon extends React.PureComponent<CategoryPillProps> {
  render() {
    const { icon, viewBox, size, fillColor } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    const image = require(`static/images/${icon}.svg`);

    return (
      <svg
        viewBox={viewBox || "0 0 64 64"}
        style={{
          height: size,
          width: size,
          fill: fillColor || cssColors.colorTitle1
        }}
      >
        <use href={`#${image.default.id}`} />
      </svg>
    );
  }
}

export default SvgIcon;