import React from 'react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';

import RoutingManager from '../common/RoutingManager';
import PowerchartWebApplicationToolbar from './PowerchartWebApplicationToolbar';
import PowerchartWebMenuVessel from './PowerchartWebMenuVessel';
import routeConfig from './routeConfig';

const propTypes = {
//   routeConfig: PropTypes.object,
  app: AppDelegate.propType,
};

class PowerchartWebNavigation extends React.Component {
  render() {
    return (
      <RoutingManager
        app={this.props.app}
        routeConfig={routeConfig}
        applicationToolbar={(
          <PowerchartWebApplicationToolbar />
        )}
        menuRoutingVessel={(
          <PowerchartWebMenuVessel />
        )}
        menuPlaceholderRoute={(
          <Route
            render={() => (
              <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                <h2>Powerchart Web</h2>
              </div>
            )}
          />
        )}
      />
    );
  }
}

PowerchartWebNavigation.propTypes = propTypes;

export default withRouter(PowerchartWebNavigation);
