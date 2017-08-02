import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';

import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

const propTypes = {
  location: PropTypes.object,
  routeConfig: PropTypes.object,
};

class RoutingManager extends React.Component {
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

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleNavPin = this.toggleNavPin.bind(this);
    this.onBack = this.onBack.bind(this);
    this.presentRootMenu = this.presentRootMenu.bind(this);
    this.validateMenusAtCurrentSize = this.validateMenusAtCurrentSize.bind(this);

    this.state = {
      navIsOpen: true,
      togglerEnabled: true,
      menuPathname: undefined,
      navIsPinned: true,
      size: RoutingManager.getBreakpointSize(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.validateMenusAtCurrentSize);
  }

  componentWillReceiveProps() {
    this.setState({
      menuPathname: undefined,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.validateMenusAtCurrentSize);
  }

  onBack(sourcePath) {
    const { routeConfig } = this.props;

    const menueRoute = routeConfig.routes[sourcePath];
    if (menueRoute.parentPath) {
      this.setState({
        menuPathname: menueRoute.parentPath,
      });
    }
  }

  presentRootMenu() {
    const { routeConfig } = this.props;

    if (routeConfig.rootRoute) {
      this.setState({
        menuPathname: routeConfig.rootRoute,
      });
    }
  }

  toggleNav() {
    const newState = {
      navIsOpen: !this.state.navIsOpen,
    };

    // Clear the current menu path when menu is opening (and not before,
    // to prevent the default menu presenting during menu close)
    if (newState.navIsOpen) {
      newState.menuPathname = undefined;
    }

    this.setState(newState);
  }

  toggleNavPin() {
    const newState = {
      navIsPinned: !this.state.navIsPinned,
    };

    this.setState(newState);
  }

  validateMenusAtCurrentSize() {
    const size = RoutingManager.getBreakpointSize();
    if (size !== this.state.size) {
      const newState = { size, navIsOpen: false };
      this.setState(newState);
    }
  }

  render() {
    const { routeConfig, location } = this.props;

    const menuLocation = (this.state.menuPathname && { pathname: this.state.menuPathname }) || location;
    const currentRouteConfig = routeConfig.routes[location.pathname];
    const menuRouteConfig = routeConfig.routes[menuLocation.pathname];

    const contentRoutes = Object.keys(routeConfig.routes).map((routeKey) => {
      const route = routeConfig.routes[routeKey];
      const routingManager = {
        size: this.state.size,
        closeMenu: this.state.navIsOpen && this.toggleNav,
        openMenu: !this.state.navIsOpen && this.toggleNav,
        pinMenu: !this.state.navIsPinned && this.toggleNavPin,
        unpinMenu: this.state.navIsPinned && this.toggleNavPin,
        presentRootMenu: location.pathname !== routeConfig.rootRoute && this.presentRootMenu,
        presentParentMenu: route.parentPath && (() => { this.onBack(route.path); }),
      };

      return (
        <Route
          exact={route.exact}
          path={route.path}
          key={route.path}
          render={(props) => {
            const Component = route.component;
            return <Component {...props} routingManager={routingManager} />;
          }}
        />
      );
    });

    const menuRoutes = Object.keys(routeConfig.routes).map((routeKey) => {
      const route = routeConfig.routes[routeKey];
      const routingManager = {
        size: this.state.size,
        closeMenu: this.state.navIsOpen && this.toggleNav,
        openMenu: !this.state.navIsOpen && this.toggleNav,
        pinMenu: !this.state.navIsPinned && this.toggleNavPin,
        unpinMenu: this.state.navIsPinned && this.toggleNavPin,
        presentRootMenu: menuLocation.pathname !== routeConfig.rootRoute && this.presentRootMenu,
        presentParentMenu: route.parentPath && (() => { this.onBack(route.path); }),
      };

      return (
        <Route
          exact={route.exact}
          path={route.path}
          key={route.path}
          render={(props) => {
            const Component = route.menuComponent;
            return <Component {...props} routingManager={routingManager} />;
          }}
        />
      );
    });

    return (
      <div style={{ height: '100%', backgroundColor: 'lightgrey' }}>
        <ContentContainer
          fill
          header={(<div style={{ height: '44px', backgroundColor: 'lightblue' }}><Button text="Toggle" onClick={this.toggleNav} /></div>)}
        >
          <SlidePanel
            isOpen={this.state.navIsOpen}
            panelBehavior={this.state.navIsPinned ? 'squish' : 'overlay'}
            panelPosition="start"
            fill
            panelContent={(
              <div style={{ height: '100%' }}>
                <CSSTransitionGroup
                  transitionName="menu-fade"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  transitionEnter={!!menuRouteConfig}
                  transitionLeave={!!menuRouteConfig}
                >
                  <Route location={menuLocation} key={menuLocation.pathname}>
                    <Switch>
                      {menuRoutes}
                    </Switch>
                  </Route>
                </CSSTransitionGroup>
              </div>
            )}
            mainContent={(
              <div style={{ height: '100%' }}>
                <CSSTransitionGroup
                  transitionName="content-fade"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  transitionEnter={!!currentRouteConfig}
                  transitionLeave={!!currentRouteConfig}
                >
                  <Route location={location} key={location.pathname}>
                    <Switch>
                      {contentRoutes}
                      <Redirect to={routeConfig.rootRoute} />
                    </Switch>
                  </Route>
                </CSSTransitionGroup>
              </div>
            )}
          />
        </ContentContainer>
      </div>
    );
  }
}

RoutingManager.propTypes = propTypes;

export default withRouter(RoutingManager);
