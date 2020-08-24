/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ColorButtonBar from './ColorButtonBar';
import { FONT_FAMILIES, COLORS } from './constants';

const getStyleKey = ({ fill_color, font_family }) =>
  `${font_family}|${fill_color}`;

const SigRow = ({ font, name, pubKey, color, handleChange, isSelected }) => {
  const onClick = () => {
    handleChange(font);
  };

  let classNames = 'svg-wrapper';
  if (isSelected) classNames += ' svg-selected';
  return (
    <div onClick={onClick} className={classNames} role="button">
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

const FontFamilySelection = ({ sig, fullName, onUpdate }) => {
  if (!fullName || !sig) return null;
  const { pubKey, styling } = sig;
  const currKey = getStyleKey(styling);
  const [selectedFont, setSelectedFont] = useState(currKey);
  const [color, setColor] = useState('#000028');

  const handleChange = (font) => {
    setSelectedFont(font);
  };

  const handleUpdate = () => {
    onUpdate(selectedFont, color);
  };

  return (
    <>
      <div className="font-family-picker">
        {FONT_FAMILIES.map((font) => {
          const isSelected = selectedFont === font;
          return (
            <SigRow
              key={font}
              font={font}
              color={color}
              name={fullName}
              pubKey={pubKey}
              handleChange={handleChange}
              isSelected={isSelected}
            />
          );
        })}
      </div>
      <ColorButtonBar penColor={color} setPenColor={setColor} />
      <button type="button" onClick={handleUpdate}>
        Update
      </button>
    </>
  );
};

FontFamilySelection.propTypes = {};

export default FontFamilySelection;
