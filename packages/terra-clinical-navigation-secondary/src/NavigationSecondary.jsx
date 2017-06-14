import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';
import NavigationHeader from 'terra-clinical-navigation-header';

import './NavigationSecondary.scss';

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
  header: PropTypes.node,
};

const defaultProps = {
  children: [],
  hasPrimary: false,
  isOpen: false,
  size: 'tiny',
};

class NavigationSecondary extends React.Component {

  buildChildren() {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app });
    });
  }

  buildSideNavigation(isTiny, navigationItems) {
    // use hasPrimary here
    const sideHeader = <div onClick={this.props.requestPrimaryOpen} style={{height: '40px', width: '100%', backgroundColor: '#c07610'}}>I'm Mr. Side Primary</div>;
    return (
      <ContentContainer header={sideHeader} fill>
        {navigationItems}
      </ContentContainer>
    );
  }

  render() {
    const { 
      app,
      children,
      hasPrimary,
      header,
      isOpen,
      requestPrimaryOpen,
      requestPrimaryCLose,
      requestSecondaryOpen,
      requestSecondaryClose,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationSecondary',
      customProps.className,
    ]);

    const isTiny = size === 'tiny';
    const sideNav = this.buildSideNavigation(isTiny, []);
    const clonedChildren = this.buildChildren();
    const mainContent = (
      <ContentContainer fill header={header}>
        {clonedChildren}
      </ContentContainer>
    );

    return (
      <SlidePanel
        className={navigationClassNames}
        mainContent={mainContent}
        panelContent={sideNav}
        panelSize="small"
        panelBehavior="overlay"
        panelPosition="start"
        isOpen={isOpen}
        fill
      />
    );
  }
}

NavigationSecondary.propTypes = propTypes;
NavigationSecondary.defaultProps = defaultProps;

export default NavigationSecondary;
