import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { SigPropTypeShape } from '../propTypes';
import { updateSignature } from '../../utils/signature';
import FontFamilySelection from './FontFamilySelection';
import { COLORS } from './constants';

const SVG = ({ svgUrl }) => (
  <SvgLoader path={svgUrl}>
    {/* Important! this proxy will reset the color to black,
          otherwise old elements would still be shown in red
          because this library doesn't store previous states */}
    {/* <SvgProxy selector={'path'} fill="white" /> */}
    {/* {countryCodes.map(code => (
          <SvgProxy
            key={code}
            selector={"#" + code + ",#" + code + " path"}
            fill="red"
          />
        ))} */}
  </SvgLoader>
);

const ButtonBar = ({ penColor, setPenColor, sigPadClear, onSubmit }) => {
  const onClick = (e) => {
    // console.log(e.currentTarget.className);
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
      <button type="button" onClick={sigPadClear} className="clear">
        Clear
      </button>
      <button type="submit" onClick={onSubmit} className="update">
        Update
      </button>
    </div>
  );
};

const SignatureForm = ({ sig, user }) => {
  const { id, imageUrl } = sig;
  const sigPad = createRef();
  const [penColor, setPenColor] = useState(sig?.styling?.color || 'black');
  const sigPadClear = () => {
    sigPad.current.clear();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateSignature({
      id,
      // body: sigPad.current.toDataURL('image/svg+xml'),
    }).then(console.log);
  };

  React.useEffect(() => {
    if (sig) {
      // sigPad.current.fromDataURL(body);
      window.sigPad = sigPad.current;
    }
  }, [sig]);

  return (
    <div className="signature">
      <h1>Signature Page</h1>
      {/* <SignatureCanvas
        penColor={penColor}
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        ref={sigPad}
      /> */}
      {/* <ButtonBar
        setPenColor={setPenColor}
        penColor={penColor}
        sigPadClear={sigPadClear}
        onSubmit={onSubmit}
      /> */}
      {/* <SVG svgUrl={imageUrl} /> */}
      <FontFamilySelection sig={sig} user={user} />
      <pre>{JSON.stringify(sig, null, 2)}</pre>
    </div>
  );
};

SignatureForm.propTypes = {
  sig: SigPropTypeShape.isRequired,
};

export default SignatureForm;
