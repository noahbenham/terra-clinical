import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import SlidePanel from 'terra-slide-panel';

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
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menu: PropTypes.element,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menuBreakpoint: PropTypes.oneOf(BREAKPOINTS),
};

const defaultProps = {
  children: [],
  menuBreakpoint: 'tiny',
};

class Navigation extends React.Component {

  componentDidMount() {
    if (this.props.registerNavigation) {
      this.props.registerNavigation(this.props.index, this.shouldDisplayMenu(this.props.size, this.props.menu, this.props.menuBreakpoint));
    }
  }

  componentWillUnmount() {
    if (this.props.deregisterNavigation) {
      this.props.deregisterNavigation(this.props.index);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.registerNavigation) {
      const displayMenu = this.shouldDisplayMenu(this.props.size, this.props.menu, this.props.menuBreakpoint);
      const newDisplayMenu = this.shouldDisplayMenu(newProps.size, newProps.menu, newProps.menuBreakpoint);

      if (displayMenu !== newDisplayMenu) {
        newProps.registerNavigation(newProps.index, newDisplayMenu);
      } 
    }
  }

  shouldDisplayMenu(size, menu, menuBreakpoint) {
    return !!menu && (BREAKPOINTS.indexOf(size) <= BREAKPOINTS.indexOf(menuBreakpoint));
  }

  buildChildren(children, newProps) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newProps);
    });
  }

  buildMenu(menu, newProps) {
    if (menu) {
      return React.cloneElement(menu, newProps);
    }
  }

  render() {
    const { 
      app,
      children,
      deregisterNavigation,
      hasParentMenu,
      index,
      isOpenArray,
      menu,
      menuBreakpoint,
      openIndex,
      registerNavigation,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]);

    let newMenuProps;
    if (menu) {
      newMenuProps = { app, requestToggleMenu, size };
      if (hasParentMenu) {
        newMenuProps.requestOpenParentMenu = requestOpenParentMenu;
        newMenuProps.requestOpenHomeMenu = requestOpenHomeMenu;
      }
    }

    const newChildProps = {
      app,
      deregisterNavigation,
      hasParentMenu: hasParentMenu || !!menu,
      index: index + 1,
      openIndex,
      registerNavigation,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      size,
    };

    const isOpen = index >= 0 ? (index === openIndex) : false;
    const menuContent = this.buildMenu(menu, newMenuProps);
    const childContent = this.buildChildren(children, newChildProps);

    return (
      <SlidePanel
        {...customProps}
        className={navigationClassNames}
        mainContent={childContent}
        panelContent={menuContent}
        panelSize="small"
        panelBehavior="overlay"
        panelPosition="start"
        isOpen={isOpen}
        fill
      />
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
