import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ changed, onUpdate, onCancel }) => {
  return (
    <>
      <div className="footer">
        <p className="small">
          By clicking Update, I agree that the signature will be the electronic
          representation of my signature for all purposes when I use them on
          documents.
        </p>
      </div>
      <div className="actions">
        <button disabled={!changed} type="button" onClick={onUpdate}>
          Update
        </button>
        <button className="cancel" type="button">
          Cancel
        </button>
      </div>
    </>
  );
};

Footer.propTypes = {
  changed: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

Footer.defaultProps = {
  onCancel: () => {},
};

export default Footer;
