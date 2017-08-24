import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  NavLink,
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

import ApplicationToolbar from './application-toolbar/ApplicationToolbar';
import VerticalToolbar from './vertical-toolbar/VerticalToolbar';
import RoutingStack from './RoutingStack';
import McPanel from './mc-panel/McPanel';

const propTypes = {
  routeConfig: PropTypes.object,
  location: PropTypes.object,
  app: AppDelegate.propType,
};

class NoMenuComponent extends React.Component {
  componentDidMount() {
    this.props.mountCallback();
  }

  render() {
    return null;
  }
}

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

    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePin = this.togglePin.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.hideMenuToggle = this.hideMenuToggle.bind(this);
    this.showMenuToggle = this.hideMenuToggle.bind(this);
    this.isCompactLayout = this.isCompactLayout.bind(this);
    this.renderApplicationToolbar = this.renderApplicationToolbar.bind(this);
    this.renderMenuPanel = this.renderMenuPanel.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.state = {
      menuIsOpen: false,
      menuIsPinned: true,
      menuHidden: false,
      size: RoutingManager.getBreakpointSize(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps() {
    this.setState({
      menuIsHidden: false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    const newSize = RoutingManager.getBreakpointSize();

    if (this.state.size !== newSize) {
      this.setState({
        size: newSize,
        menuIsHidden: false, // We need to reset this in case menus exist at the next size
      });
    }
  }

  hideMenuToggle() {
    this.setState({
      menuIsHidden: true,
      menuIsOpen: false,
    });
  }

  showMenuToggle() {
    this.setState({
      menuIsHidden: false,
    });
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
    const { routeConfig } = this.props;

    const logo = <ApplicationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    const shouldDisplayMenuToggle = this.isCompactLayout() || !this.state.menuIsHidden;

    const primaryNavButtons = [];
    if (!this.isCompactLayout()) {
      routeConfig.primaryNav.links.forEach((link) => {
        primaryNavButtons.push((
          <NavLink to={link.path} key={link.path} activeStyle={{ fontWeight: 'bold' }} style={{ paddingLeft: '5px' }}>
            {link.name}
          </NavLink>
        ));
      });
    }

    return (
      <ApplicationToolbar
        utility={utility}
        logo={logo}
        content={<div style={{ margin: '0 5px 0 5px' }}>{primaryNavButtons}</div>}
        onToggleClick={shouldDisplayMenuToggle ? this.toggleMenu : undefined}
        toggleIsActive={this.state.menuIsOpen}
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
      routeConfig.primaryNav.links.forEach((link) => {
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

    // TODO: Investigate pre-matching the menu routes to the current location to see if a menu toggle should be displayed vs. re-rendering with this callback
    let noMenuDetector;
    if (!this.state.menuIsHidden) {
      noMenuDetector = (
        <Route
          render={() => <NoMenuComponent mountCallback={this.hideMenuToggle} />}
        />
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

    return (
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
            {noMenuDetector}
            {menuPlaceholder}
          </RoutingStack>
        </div>
      </div>
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
          routeConfig={routeConfig.contentRoutes}
          location={this.props.location}
          routingManager={{
            size,
            toggleMenu: this.toggleMenu,
            togglePin: this.togglePin,
            menuIsOpen,
            menuIsPinned,
          }}
        >
          <Redirect to={routeConfig.primaryNav.index} />
        </RoutingStack>
      </ContentContainer>
    );
  }

  render() {
    const { menuIsOpen, menuIsPinned, size } = this.state;

    return (
      <div style={{ height: '100%' }}>
        <ContentContainer
          fill
          header={!this.isCompactLayout() && this.renderApplicationToolbar()}
        >
          <McPanel
            isAnimated
            isOpen={menuIsOpen}
            onRequestClose={this.toggleMenu}
            panelBehavior={menuIsPinned ? 'squish' : 'overlay'}
            panelContent={this.renderMenuPanel()}
            mainContent={this.renderContent()}
            size={size}
            style={{ backgroundColor: 'lightgrey' }}
          />
        </ContentContainer>
      </div>
    );
  }
}

RoutingManager.propTypes = propTypes;

export default withRouter(RoutingManager);
