import {
  DISCLOSE_NAVIGATION_CONTENT,
} from './actions';

const cloneDisclosureState = (state) => {
  return Object.assign({}, state);
};

const discloseContent = (state, action) => {
  return {
    componentData: {
      name: action.data.content.name,
      props: action.data.content.props,
      key: action.data.content.key,
    },
  };
};

const navigationReducers = (state = null, action) => {
  const newState = cloneDisclosureState(state);

  switch (action.type) {
    case DISCLOSE_NAVIGATION_CONTENT:
      return discloseContent(state, action);;

    default:
      return state;
  }
};

export default navigationReducers;
