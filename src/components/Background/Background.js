import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from '@vx/gradient';
import Colors from '../../theme/colors';

const Background = ({ width, height }) => (
  <svg width={width} height={height}>
    <LinearGradient id="funky" vertical={false}>
      <stop stopColor={Colors.lightPurple200} offset="0%" />
      <stop stopColor={Colors.lightRed200} offset="50%" />
      <stop stopColor={Colors.lightOrange200} offset="100%" />
    </LinearGradient>
    <rect width={width} height={height} fill="url(#funky)" />
  </svg>
);

Background.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Background;
