import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import RoutingStack from '../common/RoutingStack';

const propTypes = {
  app: AppDelegate.propType,
  routingManager: PropTypes.object,
};

class PowerchartWebContentVessel extends React.Component {
  render() {
    const { app, routingManager } = this.props;

    const routes = (
      <RoutingStack
        navEnabled
        app={app}
        routeConfig={routingManager.routeConfig.appRoutes}
        location={routingManager.location}
        routingManager={routingManager}
      >
        <Redirect to={routingManager.routeConfig.navigation.index} />
      </RoutingStack>
    );

    return (
      <div style={{ height: '100%' }}>
        {routes}
      </div>
    );
  }
}

PowerchartWebContentVessel.propTypes = propTypes;

export default PowerchartWebContentVessel;
