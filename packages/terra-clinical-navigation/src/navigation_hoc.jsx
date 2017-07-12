import { connect } from 'react-redux';
import navigationReducers from './reducers';
import { update } from './actions';

// Create connected HOC

const mapStateToProps = (state, ownProps) => (
  (navigationState => ({
    navigationState: navigationState[ownProps.navigationKey],
  }))(state.navigation)
);

export { mapStateToProps };

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNavigation: (data) => { dispatch(update(ownProps.navigationKey, data)); },
});

export { mapDispatchToProps };

export default (Component) => {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

// Export necessary reducers

const reducers = {
  navigation: navigationReducers,
};
export { reducers };
