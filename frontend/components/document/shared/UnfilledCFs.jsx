import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { SigSeal } from '../../helperComponents';

const UnfilledCF = forwardRef(({ onRemove, children }, dragRef) => {
  return (
    <div className="content-field-description">
      <div className="drag-handle" ref={dragRef}>
        <FontAwesomeIcon icon={faArrowsAlt} color="inherit" />
      </div>
      <button className="close flat" type="button" onClick={onRemove}>
        <FontAwesomeIcon icon={faTimesCircle} color="inherit" />
      </button>
      {children}
    </div>
  );
});

const UnfilledSignature = forwardRef(
  ({ signatoryName, onRemove, height, width }, dragRef) => {
    const pubKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      <UnfilledCF onRemove={onRemove} ref={dragRef}>
        <div className="signature-box unfilled">
          <SigSeal
            height={height}
            width={width}
            name={signatoryName}
            pubKey={pubKey}
            color="var(--dark-main-blue)"
          />
        </div>
      </UnfilledCF>
    );
  },
);

const UnfilledTextBox = forwardRef(({ placeholder, onRemove }, dragRef) => {
  return (
    <UnfilledCF onRemove={onRemove} ref={dragRef}>
      <div className="textbox-box unfilled">{placeholder}</div>
    </UnfilledCF>
  );
});

UnfilledCF.propTypes = {
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.node,
};

UnfilledCF.defaultProps = {
  children: '',
};

UnfilledSignature.propTypes = {
  signatoryName: PropTypes.string,
  onRemove: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
};

UnfilledSignature.defaultProps = {
  signatoryName: '',
  onRemove: () => {},
  height: 69.36,
  width: 104.04,
};

UnfilledTextBox.propTypes = {
  placeholder: PropTypes.string,
  onRemove: PropTypes.func,
  // height: PropTypes.number,
  // width: PropTypes.number,
};

UnfilledTextBox.defaultProps = {
  placeholder: '',
  onRemove: () => {},
  // height: 16,
  // width: 104.04,
};

UnfilledCF.displayName = 'UnfilledCF';
UnfilledSignature.displayName = 'UnfilledSignature';
UnfilledTextBox.displayName = 'UnfilledTextBox';

export { UnfilledSignature, UnfilledTextBox };
