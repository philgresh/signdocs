/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { closeModal as close } from '../../actions/modal';
import { getModalState } from '../../reducers/selectors';

const ESCAPE_KEY_CODE = 27;

const Modal = ({ open, modalState, closeModal }) => {
  if (!open) {
    return null;
  }

  const {
    component: Component,
    props: modalProps,
    hasBackground = true,
  } = modalState;

  const handleKeyPress = (e) => {
    if (e.keyCode === ESCAPE_KEY_CODE) closeModal();
  };

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const modalChildClasses = clsx('modal-child', !hasBackground && 'no-child');

  return (
    <div className="modal-background" onClick={closeModal} role="presentation">
      <div
        className={modalChildClasses}
        onClick={handleBackgroundClick}
        onKeyPress={handleKeyPress}
        role="presentation"
      >
        <button type="button" onClick={closeModal} className="flat">
          &times;
        </button>
        <Component {...modalProps} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalState: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    hasBackground: PropTypes.bool,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const modalState = getModalState(state);
  return {
    modalState,
    open: modalState.open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(close()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
