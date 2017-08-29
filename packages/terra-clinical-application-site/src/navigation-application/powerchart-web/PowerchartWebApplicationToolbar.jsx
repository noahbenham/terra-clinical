import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

import ApplicationToolbar from '../common/application-toolbar/ApplicationToolbar';

const propTypes = {
  routeConfig: PropTypes.object,
  app: AppDelegate.propType,
  size: PropTypes.string,
  onToggleClick: PropTypes.func,
  menuIsOpen: PropTypes.bool,
};

class PowerchartWebApplicationToolbar extends React.Component {
  render() {
    const { app, routeConfig, size, onToggleClick, menuIsOpen } = this.props;

    const logo = <ApplicationToolbar.Logo accessory={<IconVisualization />} title={'Chart App'} />;
    const utility = <ApplicationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'McChart, Chart'} />;

    const primaryNavButtons = [];
    if (size !== 'tiny') {
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
        logo={logo}
        content={<div style={{ margin: '0 5px 0 5px' }}>{primaryNavButtons}</div>}
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
