import {
  DISCLOSE_NAVIGATION_CONTENT,
} from './actions';

const defaultState = Object.freeze([]);

const cloneDisclosureState = (state) => {
  return Object.assign([], state);
};

const discloseContent = (state, action) => {
  state[action.data.index] = {
    componentData: {
      name: action.data.content.name,
      props: action.data.content.props,
      key: action.data.content.key,
    },
  };
  state.splice(action.data.index + 1);

  return state;
};

const navigationReducers = (state = defaultState, action) => {
  const newState = cloneDisclosureState(state);

  switch (action.type) {
    case DISCLOSE_NAVIGATION_CONTENT:
      return discloseContent(newState, action);;

    default:
      return newState;
  }
};

export default navigationReducers;
