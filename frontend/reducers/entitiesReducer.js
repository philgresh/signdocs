import { RECEIVE_CURRENT_USER } from '../actions/session';

export const entitiesInitialState = {
  users: {},
  contentFields: {},
  documents: {},
  sentinelBlocks: {},
  signatureBlocks: {},
  textBlocks: {},
};

const entitiesReducer = (state = entitiesInitialState, {type, payload}) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          [payload.id]: payload,
        },
      };
    }
    default:
      return state;
  }
};

export default entitiesReducer;
