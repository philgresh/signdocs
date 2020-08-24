/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal as close } from '../../actions/modal';

const ESCAPE_KEY_CODE = 27;

function Modal({ modal, closeModal, component: Component, ...rest }) {
  if (!modal) {
    return null;
  }

  const handleKeyPress = (e) => {
    // console.log(e);
    if (e.keyCode === ESCAPE_KEY_CODE) closeModal();
  };

  return (
    <div className="modal-background" onClick={closeModal} role="presentation">
      <div
        className="modal-child"
        onClick={(e) => e.stopPropagation()}
        onKeyPress={handleKeyPress}
        role="presentation"
      >
        <Component {...rest} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  component: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(close()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
