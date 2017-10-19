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
  <div style={{ height: '60px', width: 'calc(100% - 10px)', border: '4px dashed lightgrey', margin: '5px', position: 'relative', display: 'flex' }}>
    <div style={{ position: 'absolute', top: '15px', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
      <h2 style={{ display: 'inline', margin: 0 }}>Header</h2>
      {(props.routingManager.size === 'tiny' || props.routingManager.size === 'small') && props.routingManager.toggleMenu && <button style={{ display: 'inline', marginLeft: '5px', height: '25px', border: '1px dashed lightgrey' }} onClick={props.routingManager.toggleMenu}>Toggle Menu</button>}
    </div>
  </div>
);

const LayoutMenuContainer = () => (
  <div style={{ height: 'calc(100% - 10px)', width: 'calc(100% - 10px)', border: '4px dashed lightgrey', margin: '5px', position: 'relative' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
      <h2 style={{ margin: '0' }}>Menu</h2>
    </div>
  </div>
);

const LayoutContentContainer = () => (
  <div style={{ height: 'calc(100% - 10px)', width: 'calc(100% - 10px)', border: '4px dashed lightgrey', margin: '5px', position: 'relative', backgroundColor: 'white' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
      <h2 style={{ margin: '0' }}>Content</h2>
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
