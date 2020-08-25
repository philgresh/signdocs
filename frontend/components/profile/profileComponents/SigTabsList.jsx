/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const SigTabsList = ({ onTabClick, tab }) => {
  return (
    <ul className="sig-tabs-list">
      <li
        className={tab === 'choice' ? 'current' : ''}
        onClick={onTabClick('choice')}
        role="menuitem"
      >
        Choose
      </li>
      <li
        className={tab === 'draw' ? 'current' : ''}
        onClick={onTabClick('draw')}
        role="menuitem"
      >
        Draw
      </li>
    </ul>
  );
};

SigTabsList.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
};

export default SigTabsList;
