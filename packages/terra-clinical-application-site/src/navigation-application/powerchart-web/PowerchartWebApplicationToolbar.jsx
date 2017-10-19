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
        accessory={<Image variant="rounded" src="https://yt3.ggpht.com/wm5LCci89chQvQ0oeDl-QxDMwCFTu6v0YiSEytYinTbG-hU_iLP9Jqc6cC57SbNLGxIlOfAhsrfE7BG_HO8=s900-nd-c-c0xffffffff-rj-k-no" height="26px" width="26px" isFluid />}
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
