import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';
import clsx from 'clsx';
import { SigPropTypeShape } from '../propTypes';

const COLORS = [
  'black',
  'darkslategray',
  'teal',
  'darkgreen',
  'midnightblue',
  'royalblue',
];

const ButtonBar = ({ penColor, setPenColor, sigPadClear }) => {
  const onClick = (e) => {
    // console.log(e.currentTarget.className);
    setPenColor(e.currentTarget.className);
  };
  return (
    <div className="button-bar">
      {COLORS.map((color) => {
        const disabled = color === penColor;
        const classes = clsx(color, penColor === color && 'current');
        return (
          <button
            key={color}
            className={classes}
            onClick={onClick}
            disabled={disabled}
          />
        );
      })}
      <button type="reset" onClick={sigPadClear}>
        Clear
      </button>
    </div>
  );
};

const SignatureForm = ({ sig }) => {
  const sigPad = createRef();
  const [penColor, setPenColor] = useState(sig?.styling?.color || 'black');
  const sigPadClear = () => {
    sigPad.current.clear();
  };

  React.useEffect(() => {
    if (sig && sig.body) {
      sigPad.current.fromDataURL(sig.body);
      window.sigPad = sigPad.current;
    }
  }, [sig, sig.body]);

  return (
    <div className="signature">
      <h1>Signature Page</h1>
      <SignatureCanvas
        penColor={penColor}
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        ref={sigPad}
      />
      <ButtonBar
        setPenColor={setPenColor}
        penColor={penColor}
        sigPadClear={sigPadClear}
      />
      <pre>{JSON.stringify(sig, null, 2)}</pre>
    </div>
  );
};

SignatureForm.propTypes = {
  sig: SigPropTypeShape.isRequired,
};

export default SignatureForm;
