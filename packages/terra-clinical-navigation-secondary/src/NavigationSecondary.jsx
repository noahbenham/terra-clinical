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
  constructor(props) {
    super(props);
    this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
  }

  handlePrimaryClick() {
    const navState = { primary: 'toggle' };
    this.props.requestNavigationUpdate(navState);
  }

  buildChildren() {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app });
    });
  }

  buildSideNavigation(isTiny, hasPrimary, navigationItems) {
    // use hasPrimary here
    const sideHeader = <div onClick={this.handlePrimaryClick} style={{height: '40px', width: '100%', backgroundColor: '#b6c0de'}}>I'm Mr. Side Secondary</div>;
    return (
      <ContentContainer header={sideHeader} fill>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'red' }} />
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
      requestNavigationUpdate,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationSecondary',
      customProps.className,
    ]);

    const isTiny = size === 'tiny';
    const sideNav = this.buildSideNavigation(isTiny, hasPrimary, []);
    const clonedChildren = this.buildChildren();
    const mainContent = (
      <ContentContainer fill header={header}>
        {clonedChildren}
      </ContentContainer>
    );

    return (
      <SlidePanel
        {...customProps}
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
