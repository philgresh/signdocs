import { RECEIVE_CURRENT_USER } from '../actions/session';

export const entitiesInitialState = {
  users: {},
  contentFields: {},
  documentChanges: {},
  documents: {},
  sentinelBlocks: {},
  signatureBlocks: {},
  textBlocks: {},
};

const entitiesReducer = (state = entitiesInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          [action.user.id]: action.user,
        },
      };
    }
    default:
      return state;
  }
};

export default entitiesReducer;
