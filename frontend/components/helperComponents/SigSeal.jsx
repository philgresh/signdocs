import React from 'react';
import PropTypes from 'prop-types';
import { FONT_FAMILIES, COLORS } from './constants';

const defaultFont = FONT_FAMILIES[0];
const defaultColor = COLORS[0];

const SigSeal = ({ pubKey, name, font, color }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: '#ffffff00' }}
        height="100"
        width="300"
        viewBox="0 0 300 100"
      >
        <path
          d="M 50 10 l -20 0 a 25 25 90 0 0 -25 25 L 5 65 a 25 25 90 0 0 25 25 L 50 90"
          stroke="#000028"
          fill="transparent"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="55"
          y="15"
          fontFamily="'Roboto', sans-serif"
          fontSize="15"
          fill="#000028"
          fontWeight="700"
        >
          SignDocked by:
        </text>
        <text
          x="55"
          y="94"
          fontFamily="'Roboto Mono', monospace"
          fontSize="12"
          fill={color}
        >
          {pubKey}
        </text>
        <text x="20" y="60" fontFamily={font} fontSize="30" fill={color}>
          {name}
        </text>
      </svg>
    </>
  );
};

SigSeal.propTypes = {
  name: PropTypes.string,
  pubKey: PropTypes.string,
  font: PropTypes.string,
  color: PropTypes.string,
};

SigSeal.defaultProps = {
  name: '',
  pubKey: '',
  font: defaultFont,
  color: defaultColor,
};

export default SigSeal;
