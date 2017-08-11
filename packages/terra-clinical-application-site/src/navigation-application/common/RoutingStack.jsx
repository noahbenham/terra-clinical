import React from 'react';
import PropTypes from 'prop-types';

import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';

const propTypes = {
  routeConfig: PropTypes.object,
  enableNav: PropTypes.bool,
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

  componentWillMount() {
    window.addEventListener('resize', this.validateMenus);
  }

  componentWillReceiveProps() {
    const state = {
      stackLocation: undefined,
    };

    this.setState(state);
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

  createMenuRoutes(routeConfig, baseUrl, parentPaths) {
    const { size } = this.state;
    const { navEnabled } = this.props;

    if (!routeConfig) {
      return undefined;
    }

    const constructedUrl = (baseUrl || '').concat(routeConfig.path);
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
      let updatedParentPaths = [];
      if (parentPaths) {
        updatedParentPaths = updatedParentPaths.concat(parentPaths);
      }

      if (componentConfig) {
        updatedParentPaths.push(constructedUrl);
      }

      Object.keys(routeConfig.childRoutes).forEach((childRoute) => {
        childRoutes = childRoutes.concat(this.createMenuRoutes(routeConfig.childRoutes[childRoute], constructedUrl, updatedParentPaths));
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
          path={constructedUrl}
          key={routeConfig.key || constructedUrl}
          render={(routeProps) => {
            const Component = ComponentClass;
            return (
              <Component
                {...routeProps}
                {...componentProps}
                routeConfig={routeConfig}
                routingManager={{
                  size,
                  goBack: navEnabled && parentPaths && parentPaths.length ? () => {
                    this.updateMenuLocation(parentPaths[parentPaths.length - 1]);
                  } : undefined,
                  goToRoot: navEnabled && parentPaths && parentPaths.length > 1 ? () => {
                    this.updateMenuLocation(parentPaths[0]);
                  } : undefined,
                }}
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
