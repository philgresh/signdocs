/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
// import ColorButtonBar from './ColorButtonBar';
import {
  FONT_FAMILIES,
  //  COLORS
} from '../unused/constants';
import FontFamilyOption from './FontFamilyOption';

const FontFamilySelection = ({
  choiceState,
  setChoiceState,
  fullName,
  setChanged,
}) => {
  const { pubKeyFingerprint, selectedFont, color } = choiceState;

  const handleChange = (font) => {
    setChoiceState((oldState) => ({
      ...oldState,
      selectedFont: font,
    }));
    setChanged(true);
  };

  return (
    <>
      <div className="font-family-picker">
        {FONT_FAMILIES.map((font) => {
          const isSelected = selectedFont === font;
          return (
            <FontFamilyOption
              key={font}
              font={font}
              color={color}
              name={fullName}
              pubKey={pubKeyFingerprint}
              handleChange={handleChange}
              isSelected={isSelected}
            />
          );
        })}
      </div>
      {/* <ColorButtonBar penColor={color} setPenColor={setColor} /> */}
    </>
  );
};

FontFamilySelection.propTypes = {
  fullName: PropTypes.string.isRequired,
  choiceState: PropTypes.shape({
    pubKeyFingerprint: PropTypes.string,
    selectedFont: PropTypes.string,
    color: PropTypes.string,
    changed: PropTypes.bool,
  }).isRequired,
  setChoiceState: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
};

export default FontFamilySelection;
