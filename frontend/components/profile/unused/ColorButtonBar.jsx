import React from 'react';
import PropTypes from 'prop-types';
import { COLORS } from './constants';

const ColorButtonBar = ({ penColor, setPenColor }) => {
  const onClick = (e) => {
    setPenColor(e.currentTarget.className);
  };
  return (
    <div className="button-bar">
      {COLORS.map((color) => {
        let disabled = false;
        let classes = color;
        if (penColor === color) {
          classes += ' current';
          disabled = true;
        }
        return (
          <button
            key={color}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            title={color}
            type="button"
          >
            &nbsp;
          </button>
        );
      })}
    </div>
  );
};
ColorButtonBar.propTypes = {
  penColor: PropTypes.oneOf(COLORS).isRequired,
  setPenColor: PropTypes.func.isRequired,
};

export default ColorButtonBar;
