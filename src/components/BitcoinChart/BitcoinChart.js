import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Chart from '../Chart';
import ChartTitle from '../ChartTitle';
import Loading from '../Loading';
import useStore from '../../store';

const BitcoinChart = ({ width, height }) => {
  const { bitcoinData, loading } = useStore();

  if (loading || !bitcoinData.bpi) return <Loading />;

  const prices = Object.keys(bitcoinData.bpi).map((t) => ({
    time: t,
    price: bitcoinData.bpi[t],
  }));

  const currentPrice = prices[prices.length - 1].price;
  const firstPrice = prices[0].price;
  const diffPrice = currentPrice - firstPrice;
  const hasIncreased = diffPrice > 0;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={3}
    >
      <ChartTitle
        asset="BTC"
        diffPrice={diffPrice}
        hasIncreased={hasIncreased}
        currentPrice={currentPrice}
        timePeriod="Last 30 days"
      />
      <Chart
        data={prices}
        parentWidth={width * 0.8}
        parentHeight={height * 0.7}
      />
    </Paper>

  );
};

BitcoinChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default BitcoinChart;
