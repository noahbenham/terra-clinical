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

import { NoMenuComponent } from './RouteConfigHelpers';
import ApplicationToolbar from './application-toolbar/ApplicationToolbar';
import RoutingStack from './RoutingStack';

const propTypes = {
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
    this.handleMenuMount = this.handleMenuMount.bind(this);
    this.updateSize = this.updateSize.bind(this);

    this.state = {
      navIsOpen: false,
      menuHidden: false,
      togglerEnabled: true,
      navIsPinned: true,
      size: RoutingManager.getBreakpointSize(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    if (['tiny'].indexOf(this.state.size) >= 0) {
      if (this.state.navIsOpen) {
        newState.navIsOpen = false;
      }
    }

    if (nextProps.location && nextProps.location.state && nextProps.location.state.noMenuMatch) {
      newState.menuHidden = true;
    } else {
      newState.menuHidden = false;
    }

    if (newState.navIsOpen !== this.state.navIsOpen || newState.menuHidden !== this.state.menuHidden) {
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
        menuHidden: false, // We need to reset this in case menus exist at the next size
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

  handleMenuMount(mountState) {
    const newHasMenu = mountState === 'menu';

    if (this.state.hasMenu !== newHasMenu) {
      this.setState({
        hasMenu: newHasMenu,
        navIsOpen: newHasMenu,
      });
    }
  }

  render() {
    const { routeConfig, location } = this.props;

    const logo = <ApplicationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    return (
      <div style={{ height: '100%' }}>
        <ContentContainer
          fill
          header={<ApplicationToolbar utility={utility} logo={logo} onToggleClick={!this.state.menuHidden ? this.toggleNav : undefined} />}
        >
          <SlidePanel
            isOpen={this.state.navIsOpen && !this.state.menuHidden}
            panelBehavior={this.state.navIsPinned ? 'squish' : 'overlay'}
            panelPosition="start"
            fill
            panelContent={(
              <RoutingStack
                navEnabled
                size={this.state.size}
                routeConfig={routeConfig.menuRoutes}
              >
                { !this.state.menuHidden ? (
                  <Redirect
                    to={{
                      pathname: location.pathname,
                      state: { noMenuMatch: true },
                    }}
                  />
                ) : null}
              </RoutingStack>
            )}
            mainContent={(
              <RoutingStack
                size={this.state.size}
                routeConfig={routeConfig.contentRoutes}
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
