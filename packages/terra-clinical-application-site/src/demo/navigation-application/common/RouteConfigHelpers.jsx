import React from 'react';
import PropTypes from 'prop-types';

import {
  Route,
} from 'react-router-dom';

const createRoute = (routeConfig, customProps) => (
  <Route
    exact={routeConfig.exact}
    path={routeConfig.path}
    key={routeConfig.path}
    render={(props) => {
      const Component = routeConfig.component;
      return <Component {...props} {...routeConfig.props} {...customProps} />;
    }}
  />
);

const RouteConfigHelpers = { createRoute };

export default RouteConfigHelpers;
export { createRoute };
