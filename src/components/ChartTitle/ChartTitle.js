import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Colors from '../../theme/colors';
import formatPrice from '../../utils/formatPrice';

const ChartTitle = ({
  asset, currentPrice, diffPrice, hasIncreased, timePeriod,
}) => (
  <Box sx={{
    padding: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }}
  >
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      '& span': {
        fontSize: 24,
      },
      '& small': {
        color: Colors.lightBlue200,
      },
    }}
    >
      <span>{asset}</span>
      <small>{timePeriod}</small>
    </Box>
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'column',
      '& .current': {
        fontSize: 24,
      },
      '& .gain, .loss': {
        fontSize: 12,
        fontWeight: 800,
      },
      '& .gain': {
        color: Colors.lightGreen200,
      },
      '& .loss': {
        color: Colors.lightRed200,
      },
    }}
    >
      <div className="current">
        {formatPrice(currentPrice)}
      </div>
      <div className={hasIncreased ? 'gain' : 'loss'}>
        {hasIncreased ? '+' : ''}
        {formatPrice(diffPrice)}
      </div>
    </Box>
  </Box>
);

ChartTitle.propTypes = {
  asset: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  diffPrice: PropTypes.number.isRequired,
  hasIncreased: PropTypes.bool.isRequired,
  timePeriod: PropTypes.string.isRequired,
};

export default ChartTitle;
