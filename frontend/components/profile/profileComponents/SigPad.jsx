import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../unused/constants';

const SigPad = ({ sigPadRef, setChanged }) => {
  const [hasContent, setHasContent] = useState(false);
  const [penColor] = useState('#000028');

  const sigPadClear = () => {
    sigPadRef.current.clear();
    setChanged(false);
    setHasContent(false);
  };

  const onEnd = () => {
    setChanged(true);
    setHasContent(true);
  };

  // React.useEffect(() => {
  //   if (sig) {
  //     // sigPadRef.current.fromDataURL(body);
  //     window.sigPadRef = sigPadRef.current;
  //   }
  // }, [sig]);

  return (
    <div className="sig-draw-pad">
      <div className="sig-canvas">
        <SignatureCanvas
          penColor={penColor}
          canvasProps={{ width: 600, height: 200 }}
          ref={sigPadRef}
          onEnd={onEnd}
        />
        {hasContent && (
          <button type="button" className="clear flat" onClick={sigPadClear}>
            <FontAwesomeIcon icon={faTrashAlt} color={penColor} />
          </button>
        )}
      </div>
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
