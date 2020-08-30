/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const FontFamilyOption = ({
  font,
  name,
  pubKey,
  color,
  handleChange,
  isSelected,
}) => {
  const onClick = () => {
    handleChange(font);
  };

  let classNames = 'svg-wrapper';
  if (isSelected) classNames += ' svg-selected';
  return (
    <div onClick={onClick} className={classNames} role="menuitem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: '#ffffff00' }}
        height="100"
        width="300"
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
          fill="#000028"
        >
          {pubKey}
        </text>
        <text x="20" y="60" fontFamily={font} fontSize="30" fill={color}>
          {name}
        </text>
      </svg>
    </div>
  );
};

FontFamilyOption.propTypes = {
  font: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pubKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default FontFamilyOption;
