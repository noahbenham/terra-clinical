import React from 'react';
import { connect } from 'react-redux';
import navigationReducers from './reducers';
import { update } from './actions';

// Create Instancer

const instancer = () => {
  return (Component) => {
    class Instancer extends React.Component {
      render() {
        return <Component {...this.props} key={Math.random()} />
      }
    }

    return Instancer;
  }
}

// Create connected HOC

const mapStateToProps = (state, ownProps) => (
  (navigationState => ({
    navigationState: navigationState[ownProps.navigationKey],
  }))(state.navigation)
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNavigation: (data) => { dispatch(update(ownProps.navigationKey, data)); },
});

export default (Component) => {
  return connect(mapStateToProps, mapDispatchToProps)(instancer()(Component));
};

// Export necessary reducers

const reducers = {
  navigation: navigationReducers,
};
export { reducers };
