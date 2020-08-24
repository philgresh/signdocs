import React from 'react';
import PropTypes from 'prop-types';

const FONT_FAMILIES = Object.freeze([
  "'Caveat', cursive",
  "'Dancing Script', cursive",
  "'Homemade Apple', cursive",
  "'Permanent Marker', cursive",
  "'Rock Salt', cursive",
]);

const SigRow = ({ font, name, pubKey }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#ffffff00' }}
      height="100"
      width="300"
      className={`sig-font-option`}
    >
      <text
        xmlns="http://www.w3.org/2000/svg"
        x="20"
        y="65"
        fontFamily={font}
        fontSize="30"
        fill="midnightblue"
      >
        {name}
      </text>
    </svg>
  );
};

const FontFamilySelection = ({
  sig: { pubKey },
  user: { firstName, lastName },
}) => {
  const name = `${user.firstName} ${user.lastName}`;
  return (
    <div>
      {FONT_FAMILIES.map((font) => (
        <SigRow key={font} font={font} name={name} pubKey={pubKey} />
      ))}
    </div>
  );
};

FontFamilySelection.propTypes = {};

export default FontFamilySelection;
