import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';
import NavigationHeader from 'terra-clinical-navigation-header';

import './NavigationPrimary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  content: PropTypes.element,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  logo: PropTypes.element,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  utility: PropTypes.element,
};

const defaultProps = {
  children: [],
  hasSecondary: false,
  isOpen: false,
  size: 'tiny',
};

class NavigationPrimary extends React.Component {

  constructor(props) {
    super(props);
    this.handleNavButtonClick = this.handleNavButtonClick.bind(this);
  }

  handleNavButtonClick() {
    let navState = { primary: 'false', secondary: 'toggle' };
    if (!this.props.hasSecondary) {
      navState = { primary: 'toggle' };
    }
    
    this.props.requestNavigationUpdate(navState);
  }

  buildTopNavigation(isTiny) {
    const { hasSecondary, content, logo, utility } = this.props;

    let onButtonClick;
    if (hasSecondary || (isTiny && content)) {
      onButtonClick = this.handleNavButtonClick;
    }

    let navItems;
    if (!isTiny) {
      let horizontalContent;
      if (content) {
        horizontalContent = React.cloneElement(content, { isVerticalAlignment: false });
      }
      navItems = { content: horizontalContent, logo, utility };
    }
    return <NavigationHeader onButtonClick={onButtonClick} {...navItems} />;
  }

  buildSideNavigation(shouldDisplaySide) {
    if (shouldDisplaySide) {
      const { content } = this.props;
      let verticalContent;
      if (content) {
        verticalContent = React.cloneElement(content, { isVerticalAlignment: true });
      }
      return (
        <div style={{ height: '100%', width: '100%', backgroundColor: 'pink' }}>
          {verticalContent}
        </div>
      );
    }
  }

  buildChildren() {
    const { app, children, content} = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app, isPrimaryButtonEnabled: !!content });
    });
  }

  render() {
    const { 
      app,
      children,
      content,
      hasSecondary,
      isOpen,
      logo,
      requestNavigationUpdate,
      size,
      utility,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationPrimary',
      customProps.className,
    ]); 

    const isTiny = size === 'tiny';
    const topNav = this.buildTopNavigation(isTiny);
    const sideNav = this.buildSideNavigation(isTiny);
    const clonedChildren = this.buildChildren();

    let panelClassNames;
    if (!isTiny) {
      panelClassNames = 'terraClinical-PrimaryPanel--disabled';
    }

    return (
      <div {...customProps} className={navigationClassNames}>
        <ContentContainer header={topNav} fill>
          <SlidePanel
            className={panelClassNames}
            mainContent={clonedChildren}
            panelContent={sideNav}
            panelSize="small"
            panelBehavior="overlay"
            panelPosition="start"
            isOpen={isOpen && isTiny}
            fill
          />
        </ContentContainer>
      </div>
    );
  }
}

NavigationPrimary.propTypes = propTypes;
NavigationPrimary.defaultProps = defaultProps;

export default NavigationPrimary;
