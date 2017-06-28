import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import Navigation from './Navigation';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the Navigation's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  banner: PropTypes.element,
  /**
   * Components that will receive the Navigation's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
  /**
   * Components that will receive the Navigation's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menu: PropTypes.element,
};

const defaultProps = {
  children: [],
};

class UnmanagedNavigation extends React.Component {

  render() {
    const { 
      menu,
      ...customProps
    } = this.props;

    let menuContent = menu;
    if (size !== 'tiny') {
      menuContent = null;
    }

    return (
      <Navigation {...customProps} menu={menuContent} />
    );
  }
}

UnmanagedNavigation.propTypes = propTypes;
UnmanagedNavigation.defaultProps = defaultProps;

export default UnmanagedNavigation;
