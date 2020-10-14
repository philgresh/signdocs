/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SigSeal } from '../../helperComponents';

const FontFamilyOption = ({
  font,
  name,
  pubKey,
  color,
  handleChange,
  isSelected,
  isCurrent,
}) => {
  const onClick = () => {
    handleChange(font);
  };

  const classNames = clsx(
    'svg-wrapper',
    isSelected && 'svg-selected',
    isCurrent && 'svg-current',
  );

  return (
    <div onClick={onClick} className={classNames} role="menuitem">
      <SigSeal pubKey={pubKey} name={name} font={font} color={color} />
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
  isCurrent: PropTypes.bool.isRequired,
};

export default FontFamilyOption;
