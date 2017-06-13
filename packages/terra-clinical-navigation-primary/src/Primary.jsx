import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';

import './Primary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
  isOpen: false,
  size: 'tiny',
};

class Primary extends React.Component {

  buildSideNavigation(shouldDisplaySide, navigationItems) {
    if (shouldDisplaySide) {
      const sideHeader = <div onClick={this.handleRequestClose} style={{height: '40px', width: '100%', backgroundColor: '#c07610'}}>I'm Mr. Side Primary</div>;
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
  }

  buildChildren(isTiny) {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app, requestPrimaryOpen: this.handleRequestOpen, isTiny});
    });
  }

  buildMainContent(children, topNav) {
    return (
      <ContentContainer
        header={topNav}
        fill
        style={{backgroundColor: '#c03710'}}
      >
        {children}
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
      'terraClinical-NavigationPrimary',
      customProps.className,
    ]); 

    const isTiny = size === 'tiny';
    const topNav = this.buildTopNavigation(!isTiny);
    const sideNav = this.buildSideNavigation(isTiny, []);
    const clonedChildren = this.buildChildren(isTiny);
    const mainContent = this.buildMainContent(clonedChildren, topNav);

    let panelClassNames;
    if (!isTiny) {
      panelClassNames = 'terraClinical-PrimaryPanel--disabled';
    }

    return (
      <div {...customProps} className={navigationClassNames}>
        <SlidePanel
          className={panelClassNames}
          mainContent={mainContent}
          panelContent={sideNav}
          panelSize="small"
          panelBehavior="overlay"
          panelPosition="start"
          isOpen={isOpen && isTiny}
          fill
        />
      </div>
    );
  }
}

Primary.propTypes = propTypes;
Primary.defaultProps = defaultProps;

export default Primary;
