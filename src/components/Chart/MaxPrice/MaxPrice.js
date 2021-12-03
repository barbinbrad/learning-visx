/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { curveMonotoneX } from '@vx/curve';
import { LinePath } from '@vx/shape';

import Colors from '../../../theme/colors';

const MaxPrice = ({
  data, label, yText, yScale, xScale, x, y,
}) => (
  <g>
    <LinePath
      data={data}
      x={(d) => xScale(x(d)) ?? 0}
      y={(d) => yScale(y(d)) ?? 0}
      stroke={Colors.lightBlue200}
      strokeWidth={1}
      strokeDasharray="4,4"
      strokeOpacity=".3"
      curve={curveMonotoneX}
    />
    <text fill={Colors.lightBlue200} y={yText} dy="1.3em" dx="25px" fontSize="12">
      {label}
    </text>
  </g>
);

MaxPrice.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  yText: PropTypes.number.isRequired,
  yScale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
};

export default MaxPrice;
