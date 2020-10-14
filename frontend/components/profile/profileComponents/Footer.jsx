import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ changed, onUpdate, updating }) => {
  const disabled = !changed || updating;
  return (
    <div className="footer">
      <p className="small">
        By clicking Update, I agree that the signature will be the electronic
        representation of my signature for all purposes when I use them on
        documents.
      </p>
      <div className="actions">
        <button disabled={disabled} type="button" onClick={onUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

Footer.propTypes = {
  changed: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
};

export default Footer;
