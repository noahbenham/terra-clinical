import React from 'react';
import { connect } from 'react-redux';
import navigationReducers from './reducers';
import { update } from './actions';

// Create connected HOC

export default (navigationKey) => {
  const mapStateToProps = (state) => (
    (navigationState => ({
      navigationKey: navigationKey,
      navigationData: navigationState[navigationKey] && navigationState[navigationKey].data,
      navigationUpdateId: navigationState[navigationKey] && navigationState[navigationKey].updateId,
    }))(state.navigation)
  );

  const mapDispatchToProps = (dispatch) => ({
    updateNavigation: (data) => { dispatch(update(navigationKey, data)); },
  });

  return (Component) => (
    connect(mapStateToProps, mapDispatchToProps)(Component)
  )
};

// Export necessary reducers

const reducers = {
  navigation: navigationReducers,
};
export { reducers };
