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
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  contentComponentData: PropTypes.objectOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
  })),
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  discloseContent: PropTypes.func.required,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menu: PropTypes.element,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  menuBreakpoint: PropTypes.oneOf(BREAKPOINTS),
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  routes: PropTypes.objectOf(PropTypes.shapeOf({
    key: PropTypes.string,
    reactComponent: PropTypes.func,
  })),
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

  render() {
    const { 
      app,
      contentComponentData,
      deregisterNavigation,
      discloseContent,
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
      routes,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]);
    const isOpen = index >= 0 ? (index === openIndex) : false;

    let menuElement;
    if (menu) {
      const newMenuProps = { app, requestToggleMenu, discloseContent, size };
      if (hasParentMenu) {
        newMenuProps.requestOpenParentMenu = requestOpenParentMenu;
        newMenuProps.requestOpenHomeMenu = requestOpenHomeMenu;
      }
      menuElement = React.cloneElement(menu, newProps);
    }

    let contentElement;
    if (contentComponentData) {
      const contentProps = {
        ...contentComponentData.props,
        app,
        deregisterNavigation,
        hasParentMenu: hasParentMenu || !!menu,
        index: index + 1,
        openIndex,
        registerNavigation,
        requestOpenHomeMenu,
        requestOpenParentMenu,
        requestToggleMenu,        
      };
      
      const ContentClass = routes[contentComponentData.name];
      if (ContentClass) {
        return <ComponentClass key={contentComponentData.key}  {...contentProps} />;
      }
    }

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
