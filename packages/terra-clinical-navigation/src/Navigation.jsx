import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';

import './Navigation.scss';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  children: PropTypes.node,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  contentParent: PropTypes.element,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menuBreakpoint: PropTypes.oneOf(BREAKPOINTS),
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menuClass: PropTypes.func,
    /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menuProps: PropTypes.object,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menuRoutes: PropTypes.object,
  index: PropTypes.number,
  requestToggleMenu: PropTypes.func,
  size: PropTypes.string,
  registerNavigation: PropTypes.func,
  deregisterNavigation: PropTypes.func,
  navigationKey: PropTypes.string,
  navigationState: PropTypes.object,
};

const defaultProps = {
  menuBreakpoint: 'tiny',
  menuRoutes: {},
};

class Navigation extends React.Component {

  componentDidMount() {
    if (this.props.registerNavigation) {
      const menuData = {
        breakpoint: this.props.menuBreakpoint,
        class: this.props.menuClass,
        props: this.props.menuProps,
      };
      this.props.registerNavigation(this.props.index, menuData);
    }
  }

  componentWillUnmount() {
    if (this.props.deregisterNavigation) {
      this.props.deregisterNavigation(this.props.index);
    }
  }

  render() {
    const {
      app,
      children,
      contentParent,
      deregisterNavigation,
      index,
      menuBreakpoint,
      menuClass,
      menuProps,
      menuRoutes,
      registerNavigation,
      requestToggleMenu,
      size,
      navigationKey,
      navigationState,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]);

    let childContent;
    if (children) {
      const newChildProps = {
        app,
        index: index + 1,
        requestToggleMenu,
        size,
        registerNavigation,
        deregisterNavigation,
      };

      childContent = React.Children.map(children, child => (
        React.cloneElement(child, newChildProps)
      ));
    }

    if (contentParent) {
      const newParentProps = { app, requestToggleMenu, size, children: childContent, registerNavigation, deregisterNavigation };
      childContent = React.cloneElement(contentParent, newParentProps);
    }

    return (
      <div {...customProps} className={navigationClassNames}>
        {childContent}
      </div>
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
Navigation.breakpoints = BREAKPOINTS;

export default Navigation;
