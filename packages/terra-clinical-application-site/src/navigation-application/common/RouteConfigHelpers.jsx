import React from 'react';
import PropTypes from 'prop-types';

import {
  Route,
} from 'react-router-dom';

const createMenuRoutes = (routeConfig, size, customProps) => {
  if (!routeConfig) {
    return undefined;
  }

  let componentConfig;

  if (typeof (routeConfig.component) === 'object') {
    componentConfig = routeConfig.component[size] || routeConfig.component.default;
  }

  let ComponentClass;
  let componentProps;

  if (componentConfig) {
    ComponentClass = componentConfig.type;
    componentProps = componentConfig.props;
  }

  let childRoutes = [];
  if (routeConfig.childRoutes) {
    Object.keys(routeConfig.childRoutes).forEach((childRoute) => {
      childRoutes = childRoutes.concat(createMenuRoutes(routeConfig.childRoutes[childRoute], size, routingManagerCallback, customProps));
    });
  }

  if (!componentConfig && (!childRoutes || !childRoutes.length)) {
    return undefined;
  }

  let routes = [];
  if (childRoutes && childRoutes.length) {
    routes = routes.concat(childRoutes);
  }

  if (ComponentClass) {
    routes.push((
      <Route
        exact={routeConfig.exact}
        path={routeConfig.path}
        key={routeConfig.key || routeConfig.path}
        render={(props) => {
          const Component = menuComponent(ComponentClass);
          return <Component {...props} {...componentProps} {...customProps} routeConfig={routeConfig} />;
        }}
      />
    ));
  }

  return routes;
};

const createRoute = (routeConfig, size, customProps) => {
  if (!routeConfig) {
    return undefined;
  }

  let ComponentClass;
  let componentProps;
  let supportedSizes;

  if (typeof routeConfig.component === 'object') {
    ComponentClass = routeConfig.component.type;
    componentProps = routeConfig.component.props;
    supportedSizes = routeConfig.component.breakpoints;
  } else {
    ComponentClass = routeConfig.component;
  }

  if (supportedSizes && supportedSizes.length && supportedSizes.indexOf(size) < 0) {
    return undefined;
  }

  return (
    <Route
      exact={routeConfig.exact}
      path={routeConfig.path}
      key={routeConfig.path}
      render={(props) => {
        const Component = ComponentClass;
        return <Component {...props} {...componentProps} {...customProps} />;
      }}
    />
  );
};

class NoMenuComponent extends React.Component {
  componentDidMount() {
    this.props.routingManagerCallback('nomenu');
  }

  render() {
    return null;
  }
}

const menuComponent = Component => (
  class MenuComponent extends React.Component {
    componentDidMount() {
      // this.props.routingManagerCallback('menu');
    }

    render() {
      const { routingManagerCallback, ...otherProps } = this.props;
      return (
        <Component {...otherProps} />
      );
    }
  }
);

const RouteConfigHelpers = { createRoute };

export default RouteConfigHelpers;
export { createRoute, createMenuRoutes, menuComponent, NoMenuComponent };
