/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal as close } from '../../actions/modal';
import { getModalState } from '../../reducers/selectors';

const ESCAPE_KEY_CODE = 27;

const Modal = () => {
  const modalState = useSelector(getModalState);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(close());

  if (!modalState?.open) {
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

export default Modal;
