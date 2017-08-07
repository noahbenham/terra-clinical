import React from 'react';
import PropTypes from 'prop-types';

import {
  Route,
} from 'react-router-dom';

const createMenuRoute = (routeConfig, size, routingManagerCallback, customProps) => {
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
        const Component = menuComponent(ComponentClass);
        return <Component {...props} {...componentProps} {...customProps} routingManagerCallback={routingManagerCallback} />;
      }}
    />
  );
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

const menuComponent = (Component) => (
  class MenuComponent extends React.Component {
    componentDidMount() {
      this.props.routingManagerCallback('menu');
    }

    render() {
      const { routingManagerCallback, ...otherProps } = this.props;
      return (
        <Component {...otherProps} />
      )
    }
  }
)

const RouteConfigHelpers = { createRoute };

export default RouteConfigHelpers;
export { createRoute, createMenuRoute, menuComponent, NoMenuComponent };
