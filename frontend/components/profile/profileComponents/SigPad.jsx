import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../unused/constants';

const SigPad = ({ sigPadRef, setChanged }) => {
  const [penColor, setPenColor] = useState('#000028');

  const sigPadClear = () => {
    sigPadRef.current.clear();
    setChanged(false);
  };

  const onEnd = () => {
    setChanged(true);
  };

  // React.useEffect(() => {
  //   if (sig) {
  //     // sigPadRef.current.fromDataURL(body);
  //     window.sigPadRef = sigPadRef.current;
  //   }
  // }, [sig]);

  return (
    <div className="sig-draw-pad">
      <SignatureCanvas
        penColor={penColor}
        canvasProps={{ width: 600, height: 200, className: 'sig-canvas' }}
        ref={sigPadRef}
        onEnd={onEnd}
      />
      <button type="button" className="clear" onClick={sigPadClear}>
        <FontAwesomeIcon icon={faTrashAlt} color={penColor} />
      </button>
      <p className="small">Draw Signature</p>
    </div>
  );
};

SigPad.propTypes = {
  sigPadRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  setChanged: PropTypes.func.isRequired,
};

export default SigPad;
