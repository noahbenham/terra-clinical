import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ResponsiveElement from 'terra-responsive-element';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';

import './NavigationPrimary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the NavigationPrimary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
};

class NavigationPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isTiny: false};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  buildTopNavigation(shouldDisplayTop) {
    if (shouldDisplayTop) {
      return (
        <div style={{height: '40px', width: '100%', backgroundColor: '#1a8fdc'}}>I'm Mr. Top Primary</div>
      );
    }
  }

  buildSideNavigation(shouldDisplaySide) {
    if (shouldDisplaySide) {
      const sideHeader = <div style={{height: '40px', width: '100%'}}>I'm Mr. Side Primary</div>;
      return (
        <ContentContainer header={sideHeader} fill style={{backgroundColor: '#c03710'}} />
      );
    }
  }

  buildChildren() {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app });
    });
  }

  render() {
    const { children, ...customProps } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationPrimary',
      customProps.className,
    ]); 

    const topNav = this.buildTopNavigation(!this.state.isTiny);
    const sideNav = this.buildSideNavigation(this.state.isTiny);
    const clonedChildren = this.buildChildren();

    return (
      <div {...customProps} className={navigationClassNames} style={{height: '400px', width: '100%'}}>
        <SlidePanel
          mainContent={<ContentContainer header={topNav} fill style={{backgroundColor: '#c03710'}}>{clonedChildren}</ContentContainer>}
          panelContent={sideNav}
          panelSize="small"
          panelBehavior="overlay"
          panelPosition="start"
          isOpen={this.state.isOpen && this.state.isTiny}
          fill
        />
      </div>
    );
  }
}

NavigationPrimary.propTypes = propTypes;
NavigationPrimary.defaultProps = defaultProps;

export default NavigationPrimary;
