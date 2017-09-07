import {
  LOAD_CHART_REVIEW,
  LOAD_CHART_REVIEW_SUCCEEDED,
  LOAD_CHART_REVIEW_FAILED,
  FOCUS_CHART_REVIEW_SECTION,
  SORT_REVIEW,
} from './actions';

const chartReviewReducers = (state = { sections: {}, sectionSequence: [] }, action) => {
  const newState = Object.assign({}, state);
  newState.sections = Object.assign({}, state.sections || {});
  newState.sectionSequence = Object.assign([], state.sectionSequence || []);

  switch (action.type) {
    case LOAD_CHART_REVIEW:
      newState.isLoading = true;
      return newState;

    case LOAD_CHART_REVIEW_SUCCEEDED:
      newState.failure = false;
      newState.isLoading = false;
      newState.sections = action.chartReview.sections;
      newState.sectionSequence = action.chartReview.sectionSequence;
      newState.focusedSection = undefined;

      return newState;

    case LOAD_CHART_REVIEW_FAILED:
      newState.failure = true;
      newState.isLoading = false;
      return newState;

    case FOCUS_CHART_REVIEW_SECTION:
      newState.focusedSection = action.data.sectionId;
      return newState;

    case SORT_REVIEW:
      newState.sectionSequence = newState.sectionSequence.sort(() => Math.random() * 2 - 1);
      return newState;      

    default:
      return state;
  }
};

export default chartReviewReducers;
