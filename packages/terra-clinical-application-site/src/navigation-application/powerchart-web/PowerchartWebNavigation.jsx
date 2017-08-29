import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  NavLink,
  withRouter,
  matchPath,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

import ApplicationToolbar from './application-toolbar/ApplicationToolbar';
import VerticalToolbar from './vertical-toolbar/VerticalToolbar';

const propTypes = {
  routeConfig: PropTypes.object,
  location: PropTypes.object,
  app: AppDelegate.propType,
  applicationToolbar: PropTypes.element,
};

class PowerchartWebNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePin = this.togglePin.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.isCompactLayout = this.isCompactLayout.bind(this);
    this.renderApplicationToolbar = this.renderApplicationToolbar.bind(this);
    this.renderMenuPanel = this.renderMenuPanel.bind(this);
    this.renderContent = this.renderContent.bind(this);

    const initialSize = RoutingManager.getBreakpointSize();

    this.state = {
      menuIsOpen: false,
      menuIsPinned: true,
      toggleIsAvailable: RoutingManager.hasMatchingMenuRoute(props.location.pathname, props.routeConfig, initialSize),
      size: initialSize,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    const toggleIsAvailable = RoutingManager.hasMatchingMenuRoute(nextProps.location.pathname, nextProps.routeConfig, this.state.size);

    if (toggleIsAvailable !== this.state.toggleIsAvailable) {
      this.setState({ toggleIsAvailable });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    const newSize = RoutingManager.getBreakpointSize();

    if (this.state.size !== newSize) {
      this.setState({
        size: newSize,
        toggleIsAvailable: RoutingManager.hasMatchingMenuRoute(this.props.location.pathname, this.props.routeConfig, newSize),
      });
    }
  }

  toggleMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  }

  togglePin() {
    this.setState({
      menuIsPinned: !this.state.menuIsPinned,
    });
  }

  isCompactLayout() {
    return this.state.size === 'tiny';
  }

  renderApplicationToolbar() {
    const { app, routeConfig, applicationToolbar } = this.props;
    const shouldDisplayMenuToggle = this.isCompactLayout() || this.state.toggleIsAvailable;

    if (applicationToolbar) {
      return React.cloneElement(applicationToolbar, {
        app,
        size: this.state.size,
        navigationLinks: routeConfig.navigation.links,
        onToggleClick: shouldDisplayMenuToggle ? this.toggleMenu : undefined,
        menuIsOpen: this.state.menuIsOpen,
      });
    }

    const logo = <ApplicationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    const primaryNavButtons = [];
    if (!this.isCompactLayout()) {
      routeConfig.navigation.links.forEach((link) => {
        primaryNavButtons.push((
          <NavLink to={link.path} key={link.path} activeStyle={{ fontWeight: 'bold' }} style={{ paddingLeft: '5px' }}>
            {link.text}
          </NavLink>
        ));
      });
    }

    return (
      <ApplicationToolbar
        app={app}
        utility={utility}
        logo={logo}
        size={this.state.size}
        content={<div style={{ margin: '0 5px 0 5px' }}>{primaryNavButtons}</div>}
        onToggleClick={shouldDisplayMenuToggle ? this.toggleMenu : undefined}
        menuIsOpen={this.state.menuIsOpen}
      />
    );
  }

  renderMenuPanel() {
    const { app, location, routeConfig } = this.props;
    const { size, menuIsOpen, menuIsPinned } = this.state;

    const isCompactLayout = this.isCompactLayout();

    let verticalNavToolbar;
    if (isCompactLayout) {
      const verticalNavItems = [];
      routeConfig.navigation.links.forEach((link) => {
        const Component = link.component;
        verticalNavItems.push((
          <div key={link.path}>
            <NavLink to={link.path} activeStyle={{ color: 'white' }} style={{ paddingLeft: '5px' }}>
              <Component />
            </NavLink>
          </div>
        ));
      });

      verticalNavToolbar = (
        <VerticalToolbar>
          {verticalNavItems}
        </VerticalToolbar>
      );
    }

    const menuPlaceholder = (
      <Route
        render={() => (
          <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
            <h2>Chart App</h2>
          </div>
        )}
      />
    );

    let menuHeader;
    if (isCompactLayout) {
      menuHeader = (
        <div style={{ height: '45px', padding: '5px', backgroundColor: '#f7f7f7', borderBottom: '1px solid lightgrey', display: 'flex', alignItems: 'center' }}>
          <h2>Chart App</h2>
        </div>
      );
    }

    return (
      <ContentContainer
        fill
        header={menuHeader}
      >
        <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
          <div style={{ flex: '0 0 auto' }}>
            {verticalNavToolbar}
          </div>
          <div style={{ flex: '1 1 auto', position: 'relative' }}>
            <RoutingStack
              navEnabled
              app={app}
              routeConfig={routeConfig.menuRoutes}
              location={location}
              routingManager={{
                size,
                toggleMenu: this.toggleMenu,
                togglePin: !isCompactLayout && this.togglePin,
                menuIsOpen,
                menuIsPinned: !isCompactLayout && menuIsPinned,
              }}
            >
              {menuPlaceholder}
            </RoutingStack>
          </div>
        </div>
      </ContentContainer>
    );
  }

  renderContent() {
    const { app, routeConfig } = this.props;
    const { size, menuIsOpen, menuIsPinned } = this.state;

    return (
      <ContentContainer
        fill
        header={this.isCompactLayout() && this.renderApplicationToolbar()}
      >
        <RoutingStack
          app={app}
          routeConfig={routeConfig.appRoutes}
          location={this.props.location}
          routingManager={{
            size,
            toggleMenu: this.toggleMenu,
            togglePin: this.togglePin,
            menuIsOpen,
            menuIsPinned,
          }}
        >
          <Redirect to={routeConfig.navigation.index} />
        </RoutingStack>
      </ContentContainer>
    );
  }

  render() {
    const { menuIsOpen, menuIsPinned, size } = this.state;

    return (
      <RoutingManager
        routeConfig={routeConfig}

      />
    );
  }
}

PowerchartWebNavigation.propTypes = propTypes;

export default withRouter(PowerchartWebNavigation);
