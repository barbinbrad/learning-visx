/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Line } from '@vx/shape';

import Colors from '../../../theme/colors';

const HoverLine = ({
  from, to, tooltipLeft, tooltipTop,
}) => (
  <g>
    <Line
      from={from}
      to={to}
      stroke="white"
      strokeWidth={1}
      style={{ pointerEvents: 'none' }}
      strokeDasharray="2,2"
    />
    <circle
      cx={tooltipLeft}
      cy={tooltipTop}
      r={8}
      fill={Colors.lightGreen200}
      fillOpacity={0.2}
      style={{ pointerEvents: 'none' }}
    />
    <circle
      cx={tooltipLeft}
      cy={tooltipTop}
      r={4}
      fill={Colors.lightGreen200}
      fillOpacity={0.8}
      style={{ pointerEvents: 'none' }}
    />
  </g>
);

HoverLine.propTypes = {
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  tooltipLeft: PropTypes.number.isRequired,
  tooltipTop: PropTypes.number.isRequired,
};

export default HoverLine;
