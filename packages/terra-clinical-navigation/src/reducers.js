import {
  UPDATE,
} from './actionTypes';

const defaultState = Object.freeze({});

const cloneState = (state) => {
  const newState = Object.assign({}, state);

  return newState;
};

const generateId = key => (
  `${key}-${Math.random()}-${Date.now()}`
);

const navigationReducers = (state = defaultState, action) => {
  const newState = cloneState(state);

  switch (action.type) {
    case UPDATE:
      newState[action.key] = {
        data: action.data,
        updateId: generateId(action.key),
      };

      return newState;
    default:
      return newState;
  }
};

export default navigationReducers;
