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
};

class NavigationPrimary extends React.Component {

  constructor(props) {
    super(props);
    this.handleNavButtonClick = this.handleNavButtonClick.bind(this);
  }

  componentDidMount() {
    if (this.props.requestUpdateHasContent) {
      const hasContent = !!this.props.content && this.props.size === 'tiny';
      this.props.requestUpdateHasContent(this.props.index, hasContent);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.requestUpdateHasContent) {
      const newHasContent = !!newProps.content && newProps.size === 'tiny';
      const currentHasContent = !!this.props.content && this.props.size === 'tiny';
      if (newHasContent !== currentHasContent) {
        newProps.requestUpdateHasContent(newProps.index, newHasContent);
      }
    }
  }

  handleNavButtonClick() {
    if (this.props.requestToggleNavigation) {
      this.props.requestToggleNavigation();
    }
  }

  buildTopNavigation(isTiny) {
    const { hasContent, content, logo, utility } = this.props;

    let onButtonClick;
    if (hasContent) {
      onButtonClick = this.handleNavButtonClick;
    }

    let navItems;
    if (!isTiny) {
      let horizontalContent;
      if (content) {
        horizontalContent = React.cloneElement(content, { isVerticalAlignment: false });
      }
      navItems = { endContent: horizontalContent, start: logo, end: utility };
    }
    return <NavigationHeader onButtonClick={onButtonClick} {...navItems} key="navigation-primary-header" />;
  }

  buildSideNavigation(isTiny) {
    if (!!this.props.content && isTiny) {
      return React.cloneElement(content, { isVerticalAlignment: true });
    }
  }

  buildChildren(isTiny) {
    const { app, children, content, index, openIndex, requestToggleNavigation, requestUpNavigation, requestUpdateHasContent, size } = this.props;

    const newProps = {
      app,
      hasParentContent: !!content && isTiny,
      index: index + 1,
      openIndex,
      requestToggleNavigation,
      requestUpNavigation,
      requestUpdateHasContent,
      size,
    };

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newProps);
    });
  }

  render() {
    const { 
      app,
      children,
      content,
      hasContent,
      index,
      logo,
      openIndex,
      requestToggleNavigation,
      requestUpNavigation,
      requestUpdateHasContent,
      size,
      utility,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationPrimary',
      customProps.className,
    ]); 

    const isOpen = index ? (index === openIndex) : false;
    const isTiny = size === 'tiny';
    const topNav = this.buildTopNavigation(isTiny);
    const sideNav = this.buildSideNavigation(isTiny);
    const clonedChildren = this.buildChildren(isTiny);

    return (
      <div {...customProps} className={navigationClassNames}>
        <ContentContainer header={topNav} fill>
          <SlidePanel
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
