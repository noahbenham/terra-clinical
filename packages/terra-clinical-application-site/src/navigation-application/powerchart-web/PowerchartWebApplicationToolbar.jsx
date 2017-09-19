import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {
  NavLink,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import Image from 'terra-image';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

import ApplicationToolbar from '../common/application-toolbar/ApplicationToolbar';
import NavTabs from '../common/application-toolbar/NavTabs';

import styles from './PowerchartWebApplicationToolbar.scss';

const cx = classNames.bind(styles);

const propTypes = {
  routeConfig: PropTypes.object,
  app: AppDelegate.propType,
  size: PropTypes.string,
  onToggleClick: PropTypes.func,
  menuIsOpen: PropTypes.bool,
  userInfo: PropTypes.object,
};

class PowerchartWebApplicationToolbar extends React.Component {
  render() {
    const { app, routingManager, onToggleClick } = this.props;
    const { size, menuIsOpen, routeConfig, isCompactLayout } = routingManager;

    const logo = (
      <ApplicationToolbar.Logo 
        accessory={<Image variant="rounded" src="http://is3.mzstatic.com/image/thumb/Purple128/v4/8d/8c/67/8d8c67d0-fc56-651a-5f24-1243ef885cd3/source/175x175bb.jpg" height="28px" width="28px" isFluid />} 
        title={this.props.appTitle} 
        subtitle={this.props.appSubtitle} 
      />
    );
    const accessoryClasses = cx([
      'toolbar-accessory',
      { 'is-compact': size === 'tiny' || size === 'small' },
    ]);

    const accessory = <div className={accessoryClasses}><IconProvider /></div>;
    const utility = <ApplicationToolbar.Utility accessory={accessory} menuName="UtilityMenuExample" title={this.props.userInfo.name} />;

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
