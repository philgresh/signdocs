/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { SvgLoader } from 'react-svgmt';
import PropTypes from 'prop-types';
import { SigPropTypeShape } from '../../propTypes';

const NameHeader = ({ fullName, sig }) => {
  if (!sig) return <div className="name-header" />;
  return (
    <div className="name-header">
      <label htmlFor="fullname">
        Full Name
        <input type="text" id="fullname" value={fullName} disabled />
      </label>
      <div className="current-sig">
        <label>
          Your Current Signature:
          <SvgLoader path={sig.imageUrl} />
        </label>
      </div>
    </div>
  );
};

NameHeader.propTypes = {
  fullName: PropTypes.string.isRequired,
  sig: SigPropTypeShape.isRequired,
};

export default NameHeader;
