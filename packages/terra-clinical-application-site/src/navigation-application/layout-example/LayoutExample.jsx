import React from 'react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';

import RoutingManager from '../common/RoutingManager';

const propTypes = {
//   routeConfig: PropTypes.object,
  app: AppDelegate.propType,
};

const LayoutToolbar = () => (
  <div style={{ height: '50px' }}>
    <div style={{ height: '100%', backgroundColor: 'grey', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0', left: '50%', color: 'black', transform: 'translateX(-50%)' }}>
        <h2 style={{ margin: '0' }}>Application Toolbar</h2>
      </div>
    </div>
  </div>
);

const LayoutMenuContainer = () => (
  <div style={{ height: '100%' }}>
    <div style={{ height: '100%', backgroundColor: 'lightblue', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
        <h2>Menu</h2>
      </div>
    </div>
  </div>
);

const LayoutContentContainer = () => (
  <div style={{ height: '100%' }}>
    <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
        <h2>Content</h2>
      </div>
    </div>
  </div>
);

class LayoutExample extends React.Component {
  render() {
    return (
      <RoutingManager
        app={this.props.app}
        forceToggleAvailable
        routeConfig={{}}
        applicationToolbar={(
          <LayoutToolbar />
        )}
        menuRoutingVessel={(
          <LayoutMenuContainer />
        )}
        contentRoutingVessel={(
          <LayoutContentContainer />
        )}
      />
    );
  }
}

LayoutExample.propTypes = propTypes;

export default withRouter(LayoutExample);
