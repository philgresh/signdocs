import React from 'react';
import { SvgLoader } from 'react-svgmt';
import { useSelector } from 'react-redux';
import { getSignatureById } from '../../../reducers/selectors';

import PropTypes from 'prop-types';

const FilledSignature = ({ signatory, bbox }) => {
  const sig = useSelector(getSignatureById(signatory.sigId));

  return (
    <SvgLoader
      path={sig.imageUrl}
      height={bbox.height}
      width={bbox.width}
      viewBox="0 0 300 100"
    />
  );
};

FilledSignature.propTypes = {
  signatory: PropTypes.object.isRequired,
  bbox: PropTypes.object.isRequired,
};

export default FilledSignature;
