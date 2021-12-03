import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as VxTooltip } from '@vx/tooltip';

const Tooltip = ({
  tooltipLeft, tooltipTop, yLabel,
}) => (
  <div>

    <VxTooltip
      key={Math.random()}
      top={tooltipTop + 80}
      left={tooltipLeft}
      style={{
        position: 'absolute',
        textAlign: 'center',
        padding: '2px 10px',
        backgroundColor: 'rgba(92, 119, 235, 1.000)',
        color: 'white',
      }}
    >
      {yLabel}
    </VxTooltip>
  </div>
);

Tooltip.propTypes = {
  tooltipLeft: PropTypes.number.isRequired,
  tooltipTop: PropTypes.number.isRequired,
  yLabel: PropTypes.string.isRequired,
};

export default Tooltip;
