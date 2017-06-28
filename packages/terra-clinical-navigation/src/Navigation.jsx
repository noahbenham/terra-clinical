import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import SlidePanel from 'terra-slide-panel';

import './Navigation.scss';

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
};

const defaultProps = {
  children: [],
};

class Navigation extends React.Component {

  componentDidMount() {
    if (this.props.requestUpdateHasMenu) {
      this.props.requestUpdateHasMenu(this.props.index, !!this.props.menu);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.requestUpdateHasMenu && !!this.props.menu !== !!newProps.menu) {
      newProps.requestUpdateHasMenu(newProps.index, !!newProps.menu);
    }
  }

  buildChildren() {
    const { app, children, hasParentMenu, index, menu, openIndex, requestToggleMenu, requestOpenParentMenu, requestUpdateHasMenu, size } = this.props;

    const newProps = {
      app,
      hasParentMenu: hasParentMenu || !!menu,
      index: index + 1,
      openIndex,
      requestToggleMenu,
      requestOpenParentMenu,
      requestUpdateHasMenu,
      size,
    };

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newProps);
    });
  }

  buildMenu() {
    const { app, hasParentMenu, menu, requestToggleMenu, requestOpenParentMenu } = this.props;

    if (menu) {
      const newProps = { app, requestToggleMenu };
      if (hasParentMenu) {
        newProps.requestOpenParentMenu = requestOpenParentMenu;
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
      openIndex,
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
