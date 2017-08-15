import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import AppDelegate from 'terra-app-delegate';

import RoutingManagerDelegate from './RoutingManagerDelegate';

const propTypes = {
  routeConfig: PropTypes.object,
  navEnabled: PropTypes.bool,
  location: PropTypes.object,
  routingManager: RoutingManagerDelegate.propType,
  app: AppDelegate.propType,
  children: PropTypes.node,
};

class RoutingStack extends React.Component {
  constructor(props) {
    super(props);

    this.updateMenuLocation = this.updateMenuLocation.bind(this);
    this.createMenuRoutes = this.createMenuRoutes.bind(this);

    this.state = {
      stackLocation: undefined,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      stackLocation: undefined, // We reset the stack location whenever new props are received to reset its position.
    });
  }

  updateMenuLocation(path) {
    this.setState({
      stackLocation: { pathname: path },
    });
  }

  // TODO: Clean up this function cause it's pretty ugly
  createMenuRoutes(routeConfig, parentPaths) {
    const { navEnabled, routingManager } = this.props;

    if (!routeConfig) {
      return undefined;
    }

    let componentConfig;

    if (typeof (routeConfig.component) === 'object') {
      const configForSize = routeConfig.component[routingManager.size];

      if (configForSize) {
        componentConfig = configForSize;
      }

      if (configForSize !== null && routeConfig.component.default) {
        componentConfig = routeConfig.component.default;
      }
    }

    let ComponentClass;
    let componentProps;
    if (componentConfig) {
      ComponentClass = componentConfig.type;
      componentProps = componentConfig.props;
    }

    let childRoutes = [];
    if (routeConfig.childRoutes) {
      let updatedParentPaths = [];
      if (parentPaths) {
        updatedParentPaths = updatedParentPaths.concat(parentPaths);
      }

      if (componentConfig) {
        updatedParentPaths.push(routeConfig.path);
      }

      Object.keys(routeConfig.childRoutes).forEach((childRoute) => {
        childRoutes = childRoutes.concat(this.createMenuRoutes(routeConfig.childRoutes[childRoute], updatedParentPaths));
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
      // Merging the stack-related delegate data with the manager-related delegate data. I don't know how much
      // I like how multi-featured the delegate is...
      const routingManagerDelegate = RoutingManagerDelegate.clone(this.props.routingManager, {
        browserLocation: this.props.location,
        managerLocation: this.state.stackLocation,
        goBack: navEnabled && parentPaths && parentPaths.length ? () => {
          this.updateMenuLocation(parentPaths[parentPaths.length - 1]);
        } : undefined,
        goToRoot: navEnabled && parentPaths && parentPaths.length > 1 ? () => {
          this.updateMenuLocation(parentPaths[0]);
        } : undefined,
      });

      routes.push((
        <Route
          exact={routeConfig.exact}
          path={routeConfig.path}
          key={routeConfig.key || routeConfig.path}
          render={(routeProps) => {
            const Component = ComponentClass;
            return (
              <Component
                {...routeProps}
                {...componentProps}
                routeConfig={routeConfig}
                routingManager={routingManagerDelegate}
                app={this.props.app}
              />
            );
          }}
        />
      ));
    }

    return routes;
  }

  render() {
    const { routeConfig, location, children } = this.props;

    let routes = [];
    Object.keys(routeConfig).forEach((routeKey) => {
      routes = routes.concat(this.createMenuRoutes(routeConfig[routeKey]));
    });

    return (
      <Switch location={this.state.stackLocation || location}>
        {routes}
        {children}
      </Switch>
    );
  }
}

RoutingStack.propTypes = propTypes;

export default withRouter(RoutingStack);
