import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';

import VerticalToolbar from '../common/vertical-toolbar/VerticalToolbar';
import RoutingStack from '../common/RoutingStack';

const propTypes = {
  app: AppDelegate.propType,
  size: PropTypes.string,
  routeConfig: PropTypes.object,
};

class PowerchartWebMenuVessel extends React.Component {
  render() {
    const { app, routingManager } = this.props;

    const isCompactLayout = routingManager.size === 'tiny';

    let verticalNavToolbar;
    if (isCompactLayout) {
      const verticalNavItems = [];
      routingManager.routeConfig.navigation.links.forEach((link) => {
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

    let menuHeader;
    if (isCompactLayout) {
      menuHeader = (
        <div style={{ height: '45px', padding: '5px', backgroundColor: '#f7f7f7', borderBottom: '1px solid lightgrey', display: 'flex', alignItems: 'center' }}>
          <h2>Chart App</h2>
        </div>
      );
    }

    const placeholder = (
      <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
        <h2>Powerchart Web</h2>
      </div>
    );

    const routes = (
      <RoutingStack
        navEnabled
        app={app}
        routeConfig={routingManager.routeConfig.menuRoutes}
        location={location}
        routingManager={routingManager}
      />
    );

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
            {routes}
          </div>
        </div>
      </ContentContainer>
    );
  }
}

PowerchartWebMenuVessel.propTypes = propTypes;

export default PowerchartWebMenuVessel;
