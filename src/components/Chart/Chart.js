/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Group } from '@vx/group';
import { useTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { curveMonotoneX } from '@vx/curve';
import { AreaClosed, LinePath, Bar } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinearGradient } from '@vx/gradient';
import { PatternLines } from '@vx/pattern';
import { AxisBottom } from '@vx/axis';
import { bisector } from 'd3-array';

import HoverLine from './HoverLine';
import MaxPrice from './MaxPrice';
import MinPrice from './MinPrice';
import Tooltips from './Tooltip';
import Colors from '../../theme/colors';
import formatPrice from '../../utils/formatPrice';

const Chart = ({ data, parentWidth, parentHeight }) => {
  const margin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 45,
  };

  const svgRef = useRef(null);

  const width = parentWidth - margin.left - margin.right;
  const height = parentHeight - margin.top - margin.bottom;
  const bisectDate = bisector((d) => x(d)).left;

  const x = (d) => new Date(d.time);
  const y = (d) => d.price;

  const firstPoint = data[0];
  const currentPoint = data[data.length - 1];

  const minPrice = Math.min(...data.map(y));
  const maxPrice = Math.max(...data.map(y));

  const minData = [
    { time: x(firstPoint), price: minPrice },
    { time: x(currentPoint), price: minPrice },
  ];
  const maxData = [
    { time: x(firstPoint), price: maxPrice },
    { time: x(currentPoint), price: maxPrice },
  ];

  const xScale = scaleTime({
    range: [0, width],
    domain: [x(firstPoint), x(currentPoint)],
  });
  const yScale = scaleLinear({
    range: [height, 0],
    domain: [minPrice, maxPrice + 100],
  });

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleMouseMove = (event) => {
    const { x: xPoint } = localPoint(svgRef.current, event) || { x: 0, y: 0 };
    const x0 = xScale.invert(xPoint);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    const d = x0 - xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0;
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(x(d)),
      tooltipTop: yScale(y(d)),
    });
  };

  const handleMouseOut = () => {
    hideTooltip();
  };

  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
    }}
    >
      <svg
        ref={svgRef}
        width={parentWidth}
        height={parentHeight}
      >
        <LinearGradient
          id="fill"
          from={Colors.lightBlue200}
          to={Colors.lightBlue200}
          fromOpacity={0.2}
          toOpacity={0}
        />
        <PatternLines
          id="dLines"
          height={6}
          width={6}
          stroke="#27273f"
          strokeWidth={1}
          orientation={['diagonal']}
        />
        <Group top={margin.top} left={margin.left}>
          <AxisBottom
            data={data}
            scale={xScale}
            x={x}
            top={height}
            left={margin.left + 18}
            numTicks={3}
            hideTicks
            hideAxisLine
            tickLabelProps={() => ({
              fill: '#777',
              fontSize: 12,
              fontFamily: 'sans-serif',
              textAnchor: 'middle',
            })}
          />
          <MaxPrice
            data={maxData}
            yText={yScale(maxPrice)}
            label={formatPrice(maxPrice)}
            yScale={yScale}
            xScale={xScale}
            x={x}
            y={y}
          />
          <AreaClosed
            stroke="transparent"
            data={data}
            yScale={yScale}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            fill="url(#fill)"
            curve={curveMonotoneX}
          />
          <AreaClosed
            stroke="transparent"
            data={data}
            yScale={yScale}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            fill="url(#dLines)"
            curve={curveMonotoneX}
          />
          <LinePath
            data={data}
            y={(d) => yScale(y(d))}
            x={(d) => xScale(x(d))}
            stroke={Colors.lightBlue200}
            strokeOpacity="0.8"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
          <MinPrice
            data={minData}
            yScale={yScale}
            xScale={xScale}
            y={y}
            x={x}
            yText={yScale(minPrice)}
            label={formatPrice(minPrice)}
          />
          <Bar
            data={data}
            width={width}
            height={height - margin.bottom}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
          />
        </Group>
        {tooltipOpen
            && (
              <HoverLine
                from={{
                  x: tooltipLeft,
                  y: yScale(y(maxData[0])),
                }}
                to={{
                  x: tooltipLeft,
                  y: yScale(y(minData[0])),
                }}
                tooltipLeft={tooltipLeft}
                tooltipTop={tooltipTop}
              />
            )}
      </svg>
      {tooltipOpen
          && (
            <Tooltips
              tooltipLeft={tooltipLeft}
              tooltipTop={tooltipTop}
              yLabel={formatPrice(y(tooltipData))}
            />
          )}
    </Box>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
  parentWidth: PropTypes.number.isRequired,
  parentHeight: PropTypes.number.isRequired,
};

export default Chart;
