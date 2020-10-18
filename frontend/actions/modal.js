export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

export const receiveModal = (component, hasBackground = true) => ({
  type: OPEN_MODAL,
  payload: {
    component,
    hasBackground,
  },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
