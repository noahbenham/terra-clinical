import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';
import SecondaryHeader from './SecondaryHeader';

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
  content: PropTypes.element,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  banner: PropTypes.element,
};

const defaultProps = {
  children: [],
};

class NavigationSecondary extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpClick = this.handleUpClick.bind(this);
  }

  componentDidMount() {
    if (this.props.requestUpdateHasContent) {
      this.props.requestUpdateHasContent(this.props.index, !!this.props.content);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.requestUpdateHasContent && !!this.props.content !== !!newProps.content) {
      newProps.requestUpdateHasContent(newProps.index, !!newProps.content);
    }
  }

  handleUpClick() {
    if (this.props.requestUpNavigation) {
      this.props.requestUpNavigation();
    }
  }

  buildChildren() {
    const { app, children, content, hasParentContent, index, openIndex, requestToggleNavigation, requestUpNavigation, requestUpdateHasContent, size } = this.props;

    const newProps = {
      app,
      hasParentContent: hasParentContent || !!content,
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

  buildSideNavigation(isTiny, content) {
    let sideHeader;
    if (this.props.hasParentContent) {
      sideHeader = <SecondaryHeader onButtonClick={this.handleUpClick} />;
    }

    return (
      <ContentContainer header={sideHeader} fill>
        {content}
      </ContentContainer>
    );
  }

  render() {
    const { 
      app,
      children,
      content,
      hasParentContent,
      banner,
      index,
      isOpenArray,
      isParentContentPresent,
      openIndex,
      requestUpdateHasContent,
      requestToggleNavigation,
      requestUpNavigation,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationSecondary',
      customProps.className,
    ]);

    const isOpen = index >= 0 ? (index === openIndex) : false;
    const isTiny = size === 'tiny';
    const sideNav = this.buildSideNavigation(isTiny, content);
    const clonedChildren = this.buildChildren();
    const mainContent = (
      <ContentContainer fill header={banner}>
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
