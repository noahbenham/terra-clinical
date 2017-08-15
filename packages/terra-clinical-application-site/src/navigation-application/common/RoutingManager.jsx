import React from 'react';
import PropTypes from 'prop-types';

import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import AppDelegate from 'terra-app-delegate';

import ApplicationToolbar from './application-toolbar/ApplicationToolbar';
import RoutingStack from './RoutingStack';

const propTypes = {
  routeConfig: PropTypes.object,
  location: PropTypes.object,
  app: AppDelegate.propType,
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

    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePin = this.togglePin.bind(this);
    this.updateSize = this.updateSize.bind(this);

    const initialSize = RoutingManager.getBreakpointSize();
    const initialMenuIsOpen = ['tiny', 'small'].indexOf(initialSize) < 0;

    this.state = {
      menuIsOpen: initialMenuIsOpen,
      menuIsPinned: true,
      menuHidden: false,
      size: initialSize,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    // Hide menu when location changes at the tiny breakpoint
    if (['tiny'].indexOf(this.state.size) >= 0) {
      if (this.state.menuIsOpen) {
        newState.menuIsOpen = false;
      }
    }

    if (nextProps.location && nextProps.location.state && nextProps.location.state.noMenuMatch) {
      newState.menuIsHidden = true;
      newState.menuIsOpen = false;
    } else {
      newState.menuIsHidden = false;
    }

    if (newState.menuIsOpen !== this.state.menuIsOpen || newState.menuIsHidden !== this.state.menuIsHidden) {
      this.setState(newState);
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
        menuIsHidden: false, // We need to reset this in case menus exist at the next size
      });
    }
  }

  toggleMenu() {
    const newState = {
      menuIsOpen: !this.state.menuIsOpen,
    };

    this.setState(newState);
  }

  togglePin() {
    const newState = {
      menuIsPinned: !this.state.menuIsPinned,
    };

    this.setState(newState);
  }

  render() {
    const { routeConfig, location, app } = this.props;

    const logo = <ApplicationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    return (
      <div style={{ height: '100%' }}>
        <ContentContainer
          fill
          header={<ApplicationToolbar utility={utility} logo={logo} onToggleClick={!this.state.menuIsHidden ? this.toggleMenu : undefined} toggleIsActive={this.state.menuIsOpen} />}
        >
          <SlidePanel
            isOpen={this.state.menuIsOpen && !this.state.menuIsHidden}
            panelBehavior={this.state.menuIsPinned ? 'squish' : 'overlay'}
            panelPosition="start"
            fill
            panelContent={(
              <RoutingStack
                navEnabled
                app={app}
                routeConfig={routeConfig.menuRoutes}
                location={this.props.location}
                routingManager={{
                  size: this.state.size,
                  toggleMenu: this.toggleMenu,
                  togglePin: this.togglePin,
                  menuIsOpen: this.state.menuIsOpen,
                  menuIsPinned: this.state.menuIsPinned,
                }}
              >
                { !this.state.menuHidden ? (
                  <Redirect
                    to={{
                      pathname: location.pathname,
                      state: { noMenuMatch: true },
                    }}
                  />
                ) : null }
              </RoutingStack>
            )}
            mainContent={(
              <RoutingStack
                app={app}
                routeConfig={routeConfig.contentRoutes}
                location={this.props.location}
                routingManager={{
                  size: this.state.size,
                  toggleMenu: this.toggleMenu,
                  togglePin: this.togglePin,
                  menuIsOpen: this.state.menuIsOpen,
                  menuIsPinned: this.state.menuIsPinned,
                }}
              >
                <Redirect to={routeConfig.index} />
              </RoutingStack>
            )}
          />
        </ContentContainer>
      </div>
    );
  }
}

RoutingManager.propTypes = propTypes;

export default withRouter(RoutingManager);
