import React from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'signature_pad';
import { SigPropTypeShape } from '../propTypes';

const SignatureForm = ({ sig }) => {
  const canvas = document.querySelector('sig-canvas');

  const signaturePad = new SignaturePad(canvas);
  return (
    <div>
      <h1>Signature Page</h1>
      <canvas id="sig-canvas" height={200} width={500} />
      <pre>{JSON.stringify(sig, null, 2)}</pre>
    </div>
  );
};

SignatureForm.propTypes = {
  sig: SigPropTypeShape.isRequired,
};

export default SignatureForm;
