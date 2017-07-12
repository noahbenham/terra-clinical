import {
  UPDATE,
} from './actionTypes';

const defaultState = Object.freeze({});

const cloneState = (state) => {
  const newState = Object.assign({}, state);

  return newState;
};

const navigationReducers = (state = defaultState, action) => {
  const newState = cloneState(state);

  switch (action.type) {
    case UPDATE:
      newState[action.key] = action.data;
      return newState;
    default:
      return newState;
  }
};

export default navigationReducers;
