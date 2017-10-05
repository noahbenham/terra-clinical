import React from 'react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import Button from 'terra-button';
import Header from 'terra-clinical-header';
import RoutingManager from '../common/RoutingManager';

const propTypes = {
//   routeConfig: PropTypes.object,
  app: AppDelegate.propType,
};

const LayoutToolbar = props => (
  <Header title="Application Toolbar" endContent={(props.routingManager.size === 'tiny' || props.routingManager.size === 'small') && <Button text="Toggle" onClick={() => { props.routingManager.toggleMenu(); }} />} />
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
    <div style={{ height: '100%', backgroundColor: 'lightyellow', position: 'relative' }}>
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
