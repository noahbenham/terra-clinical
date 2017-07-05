import { connect } from 'react-redux';

import Navigation from './Navigation';

import navigationReducers from './reducers';
import { disclose } from './actions';

const mapStateToProps = state => (
  (disclosureState => ({
    contentComponentData: disclosureState.componentData,
  }))(state.navigation)
);

export { mapStateToProps };

const mapDispatchToProps = dispatch => ({
  discloseContent: (data) => { dispatch(disclose(data)); },
});

export { mapDispatchToProps };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

const reducers = {
  navigation: navigationReducers,
};
export { reducers };
