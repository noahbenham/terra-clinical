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
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleNavPin = this.toggleNavPin.bind(this);
    this.handleMenuMount = this.handleMenuMount.bind(this);

    this.state = {
      navIsOpen: true,
      hasMenu: true,
      togglerEnabled: true,
      navIsPinned: true,
    };
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
    const { routeConfig } = this.props;

    const logo = <ApplicationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    console.log('rendering manager');

    return (
      <div style={{ height: '100%' }}>
        <ContentContainer
          fill
          header={<ApplicationToolbar utility={utility} logo={logo} onToggleClick={this.state.hasMenu ? this.toggleNav : undefined} />}
        >
          <SlidePanel
            isOpen={this.state.navIsOpen}
            panelBehavior={this.state.navIsPinned ? 'squish' : 'overlay'}
            panelPosition="start"
            fill
            panelContent={(
              <RoutingStack
                navEnabled
                routeConfig={routeConfig.menuRoutes}
                key={location.pathname}
              />
            )}
            mainContent={(
              <RoutingStack
                routeConfig={routeConfig.contentRoutes}
                key={location.pathname}
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
