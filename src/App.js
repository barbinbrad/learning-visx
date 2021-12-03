import React from 'react';
import PropTypes from 'prop-types';
import { withScreenSize } from '@vx/responsive';
import Background from './components/Background';
import BitcoinChart from './components/BitcoinChart';
import Centered from './components/Centered';

const App = (props) => {
  const { screenWidth, screenHeight } = props;

  return (
    <>
      <Background width={screenWidth} height={screenHeight} />
      <Centered>
        <BitcoinChart width={screenWidth} height={screenHeight} />
      </Centered>

    </>
  );
};

App.propTypes = {
  screenWidth: PropTypes.number.isRequired,
  screenHeight: PropTypes.number.isRequired,
};

export default withScreenSize(App);
