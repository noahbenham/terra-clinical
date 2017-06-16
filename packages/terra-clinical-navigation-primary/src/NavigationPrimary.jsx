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
  icon: PropTypes.element,
  title: PropTypes.string,
  items: PropTypes.element,
};

const defaultProps = {
  children: [],
  hasSecondary: false,
  isOpen: false,
  size: 'tiny',
};

class NavigationPrimary extends React.Component {

  static hasContent(items, tools, junk, utility) {
    return !!items || !!tools || !!junk || !!utility;
  }

  constructor(props) {
    super(props);
    this.handleLogoButtonClick = this.handleLogoButtonClick.bind(this);
  }

  handleLogoButtonClick() {
    let navState = { primary: 'false', secondary: 'toggle' };
    if (!this.props.hasSecondary) {
      navState = { primary: 'toggle' };
    }
    
    this.props.requestNavigationUpdate(navState);
  }

  buildTopNavigation(isTiny) {
    const { hasSecondary, icon, items, tools, junk, title, utility } = this.props;
    const hasPrimaryContent = NavigationPrimary.hasContent(items, tools, junk, utility);

    let handleClick;
    if (hasSecondary || (isTiny && hasPrimaryContent)) {
      handleClick = this.handleLogoButtonClick;
    }

    let navItems;
    if (!isTiny) {
      navItems = {
        itemSection: items,
        toolSection: tools,
        junkSection: junk,
        utilitySection: utility,
      };
    }
    return <NavigationHeader onLogoButtonClick={handleClick} logoTitle={title} logoIcon={icon} {...navItems} />;
  }

  buildSideNavigation(shouldDisplaySide) {
    if (shouldDisplaySide) {
      const { items, tools, junk, utility } = this.props;
      return (
        <div style={{ height: '100%', width: '100%', backgroundColor: 'pink' }}>
          {items}
          {tools}
          {junk}
          {utility}
        </div>
      );
    }
  }

  buildChildren() {
    const { app, children, items, tools, junk, utility } = this.props;
    const hasPrimaryContent = NavigationPrimary.hasContent(items, tools, junk, utility);

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app, isPrimaryButtonEnabled: hasPrimaryContent });
    });
  }

  render() {
    const { 
      app,
      children,
      hasSecondary,
      icon,
      isOpen,
      items,
      requestNavigationUpdate,
      size,
      title,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationPrimary',
      customProps.className,
    ]); 

    const isTiny = size === 'tiny';
    const topNav = this.buildTopNavigation(isTiny);
    const sideNav = this.buildSideNavigation(isTiny, items);
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
