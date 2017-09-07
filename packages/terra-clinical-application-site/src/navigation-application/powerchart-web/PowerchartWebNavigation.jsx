import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';

import RoutingManager from '../common/RoutingManager';
import PowerchartWebApplicationToolbar from './PowerchartWebApplicationToolbar';
import PowerchartWebMenuVessel from './PowerchartWebMenuVessel';
import PowerchartWebContentVessel from './PowerchartWebContentVessel';

const propTypes = {
//   routeConfig: PropTypes.object,
  app: AppDelegate.propType,
  userInfo: PropTypes.object,
};

class PowerchartWebNavigation extends React.Component {
  render() {
    return (
      <RoutingManager
        app={this.props.app}
        routeConfig={this.props.routeConfig}
        applicationToolbar={(
          <PowerchartWebApplicationToolbar userInfo={this.props.userInfo} appTitle={this.props.appTitle} appSubtitle={this.props.appSubtitle} />
        )}
        menuRoutingVessel={(
          <PowerchartWebMenuVessel userInfo={this.props.userInfo} appTitle={this.props.appTitle} appSubtitle={this.props.appSubtitle} />
        )}
        contentRoutingVessel={(
          <PowerchartWebContentVessel userInfo={this.props.userInfo} />
        )}
      />
    );
  }
}

PowerchartWebNavigation.propTypes = propTypes;

export default withRouter(PowerchartWebNavigation);
