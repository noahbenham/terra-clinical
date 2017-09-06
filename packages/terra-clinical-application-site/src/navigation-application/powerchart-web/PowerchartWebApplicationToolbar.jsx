import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import Image from 'terra-image';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

import ApplicationToolbar from '../common/application-toolbar/ApplicationToolbar';
import NavTabs from '../common/application-toolbar/NavTabs';

const propTypes = {
  routeConfig: PropTypes.object,
  app: AppDelegate.propType,
  size: PropTypes.string,
  onToggleClick: PropTypes.func,
  menuIsOpen: PropTypes.bool,
};

class PowerchartWebApplicationToolbar extends React.Component {
  render() {
    const { app, routingManager, onToggleClick } = this.props;
    const { size, menuIsOpen, routeConfig, isCompactLayout } = routingManager;

    const logo = <ApplicationToolbar.Logo accessory={<Image variant="rounded" src="https://raw.github.cerner.com/ion/ios-powerchart-touch/master/Ambulatory/Images.xcassets/AppIcon.appiconset/PowerChartTouch_29.png" />} title={'Powerchart'} height="30px" width="30px" />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    let primaryNavComp;
    if (!isCompactLayout) {
      primaryNavComp = <NavTabs links={routeConfig.navigation.links} />;
    }

    return (
      <ApplicationToolbar
        logo={logo}
        content={primaryNavComp}
        utility={utility}
        app={app}
        size={size}
        onToggleClick={onToggleClick}
        menuIsOpen={menuIsOpen}
      />
    );
  }
}

PowerchartWebApplicationToolbar.propTypes = propTypes;

export default PowerchartWebApplicationToolbar;
