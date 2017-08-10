import React from 'react';
import PropTypes from 'prop-types';

import {
  Switch,
  Redirect,
  Route,
  withRouter,
} from 'react-router-dom';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import ApplicationToolbar from './application-toolbar/ApplicationToolbar';

const propTypes = {
  routeConfig: PropTypes.object,
  toggleOpen: PropTypes.bool,
  isOpen: PropTypes.bool,
  togglePin: PropTypes.bool,
  isPinned: PropTypes.bool,
};

class RoutingStack extends React.Component {
  static getBreakpointSize() {
    const width = window.innerWidth;
    const { small, medium, large, huge } = getBreakpoints();

    if (width >= huge) {
      return 'huge';
    } else if (width >= large) {
      return 'large';
    } else if (width >= medium) {
      return 'medium';
    } else if (width >= small) {
      return 'small';
    }
    return 'tiny';
  }

  constructor(props) {
    super(props);

    this.updateMenuLocation = this.updateMenuLocation.bind(this);
    this.validateMenus = this.validateMenus.bind(this);
    this.createMenuRoutes = this.createMenuRoutes.bind(this);

    this.state = {
      stackLocation: undefined,
      size: RoutingStack.getBreakpointSize(),
    };
  }

  componentWillReceiveProps() {
    const state = {
      stackLocation: undefined,
    };

    this.setState(state);
  }

  componentWillMount() {
    window.addEventListener('resize', this.validateMenus);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.validateMenus);
  }

  updateMenuLocation(path) {
    this.setState({
      stackLocation: { pathname: path },
    });
  }

  validateMenus() {
    const size = RoutingStack.getBreakpointSize();
    if (size !== this.state.size) {
      const newState = {
        size,
        navIsOpen: false,
      };

      this.setState(newState);
    }
  }

  createMenuRoutes(routeConfig, parentPaths) {
    const { size } = this.state;

    debugger;

    if (!routeConfig) {
      return undefined;
    }

    let componentConfig;

    if (typeof (routeConfig.component) === 'object') {
      const configForSize = routeConfig.component[size];

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
      const updatedParentPaths = [];
      if (parentPaths) {
        updatedParentPaths.concat(parentPaths);
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
                routingManager={{
                  size,
                  goBack: parentPaths && parentPaths.length ? () => {
                    this.updateMenuLocation(parentPaths[parentPaths.length - 1]);
                  } : undefined,
                  goToRoot: parentPaths && parentPaths.length > 1 ? () => {
                    this.updateMenuLocation(parentPaths[0]);
                  } : undefined,
                }}
              />
            );
          }}
        />
      ));
    }

    debugger;
    return routes;
  };

  render() {
    const { routeConfig, location } = this.props;

    let routes = [];
    const menuRoutes = Object.keys(routeConfig).forEach((routeKey) => {
      routes = routes.concat(this.createMenuRoutes(routeConfig[routeKey]));
    });
    debugger;
    return (
      <Switch location={this.state.stackLocation || location}>
        {routes}
      </Switch>
    );
  }
}

RoutingStack.propTypes = propTypes;

export default withRouter(RoutingStack);
