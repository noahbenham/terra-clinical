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
    if (this.props.requestUpdateHasMenu) {
      this.props.requestUpdateHasMenu(this.props.index, this.shouldDisplayMenu(this.props.size, this.props.menu, this.props.menuBreakpoint));
    }
  }

  componentWillUnmount() {
    // consider unregistering
  }

  componentWillReceiveProps(newProps) {
    if (newProps.requestUpdateHasMenu) {
      const displayMenu = this.shouldDisplayMenu(this.props.size, this.props.menu, this.props.menuBreakpoint);
      const newDisplayMenu = this.shouldDisplayMenu(newProps.size, newProps.menu, newProps.menuBreakpoint);

      if (displayMenu !== newDisplayMenu) {
        newProps.requestUpdateHasMenu(newProps.index, newDisplayMenu);
      } 
    }
  }

  shouldDisplayMenu(size, menu, menuBreakpoint) {
    return !!menu && (BREAKPOINTS.indexOf(size) <= BREAKPOINTS.indexOf(menuBreakpoint));
  }

  buildChildren() {
    const { app, children, hasParentMenu, index, menu, openIndex, requestOpenHomeMenu, requestOpenParentMenu, requestToggleMenu, requestUpdateHasMenu, size } = this.props;

    const newProps = {
      app,
      hasParentMenu: hasParentMenu || !!menu,
      index: index + 1,
      openIndex,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      requestUpdateHasMenu,
      size,
    };

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newProps);
    });
  }

  buildMenu() {
    const { app, hasParentMenu, menu, requestOpenHomeMenu, requestOpenParentMenu, requestToggleMenu, size } = this.props;

    if (menu) {
      const newProps = { app, requestToggleMenu, size };
      if (hasParentMenu) {
        newProps.requestOpenParentMenu = requestOpenParentMenu;
        newProps.requestOpenHomeMenu = requestOpenHomeMenu;
      }

      return React.cloneElement(menu, newProps);
    }
  }

  render() {
    const { 
      app,
      children,
      hasParentMenu,
      index,
      isOpenArray,
      menu,
      menuBreakpoint,
      openIndex,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      requestUpdateHasMenu,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]);

    const isOpen = index >= 0 ? (index === openIndex) : false;
    const menuContent = this.buildMenu();
    const childContent = this.buildChildren();

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
