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
};

const defaultProps = {
  children: [],
  hasSecondary: false,
  isOpen: false,
  size: 'tiny',
};

class NavigationPrimary extends React.Component {

  buildTopNavigation(isTiny, hasSecondary) {
    // hide nav button if hasSecondary is false
    return <NavigationHeader onButtonClick={this.props.requestToggleNavigation} />;
  }

  buildSideNavigation(shouldDisplaySide, navigationItems) {
    if (shouldDisplaySide) {
      const sideHeader = <div onClick={this.props.requestToggleNavigation} style={{height: '40px', width: '100%', backgroundColor: '#c07610'}}>I'm Mr. Side Primary</div>;
      return (
        <ContentContainer header={sideHeader} fill>
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

  render() {
    const { 
      app,
      children,
      hasSecondary,
      isOpen,
      requestTogglePrimary,
      requestToggleSecondary,
      requestToggleNavigation,
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
