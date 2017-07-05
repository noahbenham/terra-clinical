import {
  DISCLOSE_NAVIGATION_CONTENT,
} from './actions';

const cloneDisclosureState = (state) => {
  const newState = Object.assign({}, state);
  newState.componentData = Object.assign({}, newState.componentData);

  return newState;
};

const defaultState = Object.freeze({
  componentData: {},
});

const discloseContent = (state, action) => {
  const newState = cloneDisclosureState(state);

  newState.componentData = {
    name: action.data.content.name,
    props: action.data.content.props,
    key: action.data.content.key,
  };

  return newState;
};

const navigationReducers = (state = defaultState, action) => {
  const newState = cloneDisclosureState(state);

  switch (action.type) {
    case DISCLOSE_NAVIGATION_CONTENT:
      return discloseContent(state, action);;

    default:
      return state;
  }
};

export default navigationReducers;
