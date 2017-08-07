import React from 'react';
import PropTypes from 'prop-types';

import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import {
  Switch,
  Redirect,
  Route,
  withRouter,
} from 'react-router-dom';

import { createRoute, createMenuRoute, NoMenuComponent } from './RouteConfigHelpers';

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
    this.handleMenuMount = this.handleMenuMount.bind(this);

    this.state = {
      navIsOpen: false,
      hasMenu: false,
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
    const state = {
      menuPathname: undefined,
    };

    this.setState(state);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.validateMenusAtCurrentSize);
  }

  onBack(sourcePath) {
    const { routeConfig } = this.props;

    const menueRoute = routeConfig.menuRoutes[sourcePath];
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
      const newState = {
        size,
        navIsOpen: false,
      };

      this.setState(newState);
    }
  }

  handleMenuMount(mountState) {
    const newHasMenu = mountState === 'menu';

    if (this.state.hasMenu !== newHasMenu) {
      this.setState({
        hasMenu: newHasMenu,
      });
    }
  }

  render() {
    const { routeConfig } = this.props;

    const contentRoutes = Object.keys(routeConfig.routes).map((routeKey) => {
      const route = routeConfig.routes[routeKey];
      const routingManager = {
        size: this.state.size,
        closeMenu: this.state.navIsOpen ? this.toggleNav : undefined,
        openMenu: !this.state.navIsOpen ? this.toggleNav : undefined,
      };

      return createRoute(route, this.state.size, { routingManager });
    });

    const menuRoutes = Object.keys(routeConfig.menuRoutes).map((routeKey) => {
      const route = routeConfig.menuRoutes[routeKey];
      const routingManager = {
        size: this.state.size,
        closeMenu: this.state.navIsOpen ? this.toggleNav : undefined,
        openMenu: !this.state.navIsOpen ? this.toggleNav : undefined,
        pinMenu: !this.state.navIsPinned ? this.toggleNavPin : undefined,
        unpinMenu: this.state.navIsPinned ? this.toggleNavPin : undefined,
        presentRootMenu: route && route.parentPath && route.parentPath !== routeConfig.rootRoute ? this.presentRootMenu : undefined,
        presentParentMenu: route.parentPath ? (() => { this.onBack(route.path); }) : undefined,
      };

      return createMenuRoute(route, this.state.size, this.handleMenuMount, { routingManager });
    });

    const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <NavigationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    return (
      <div style={{ height: '100%', backgroundColor: 'lightgrey' }}>
        <ContentContainer
          fill
          header={<NavigationToolbar utility={utility} logo={logo} onToggleClick={this.state.hasMenu ? this.toggleNav : undefined} />}
        >
          <SlidePanel
            isOpen={this.state.navIsOpen}
            panelBehavior={this.state.navIsPinned ? 'squish' : 'overlay'}
            panelPosition="start"
            fill
            panelContent={(
              <div style={{ height: '100%' }}>
                <Switch>
                  {menuRoutes}
                  <Route
                    render={() => (
                      <NoMenuComponent routingManagerCallback={this.handleMenuMount} />
                    )}
                  />
                </Switch>
              </div>
            )}
            mainContent={(
              <div style={{ height: '100%' }}>
                <Switch>
                  {contentRoutes}
                  <Redirect to={routeConfig.rootRoute} />
                </Switch>
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
