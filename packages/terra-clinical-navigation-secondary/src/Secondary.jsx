import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';

import './Secondary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the Secondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
  /**
   * Components that will receive the Secondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  header: PropTypes.node,
};

const defaultProps = {
  children: [],
  isOpen: false,
  size: 'tiny',
};

class Secondary extends React.Component {

  buildChildren() {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app });
    });
  }

  buildSideNavigation(isTiny, navigationItems) {
    const sideHeader = <div onClick={this.props.requestPrimaryOpen} style={{height: '40px', width: '100%', backgroundColor: '#c07610'}}>I'm Mr. Side Primary</div>;
    return (
      <ContentContainer
        header={sideHeader}
        fill
        style={{backgroundColor: '#1022c0'}}
      >
        {navigationItems}
      </ContentContainer>
    );
  }

  render() {
    const { 
      app,
      children,
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
    let contentHeader = header;
    if (isTiny) {
      contentHeader = <div onClick={requestSecondaryOpen} style={{height: '40px', width: '100%', backgroundColor: '#10c022'}}>I'm Mr. Top Secondary</div>;
    }

    const mainContent = (
      <ContentContainer fill header={contentHeader}>
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

Secondary.propTypes = propTypes;
Secondary.defaultProps = defaultProps;

export default Secondary;
