import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import NavigationHeader from 'terra-clinical-navigation-header';

import './BasePrimary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
  hasSecondary: PropTypes.bool,
  size: PropTypes.string,
};

const defaultProps = {
  children: [],
  hasSecondary: false,
  isOpen: false,
  size: 'tiny',
};

class BasePrimary extends React.Component {
    constructor(props) {
    super(props);
    this.handleNavButtonClick = this.handleNavButtonClick.bind(this);
  }

  handleNavButtonClick() {
    const navState = { primary: 'false', secondary: 'toggle' };
    this.props.requestNavigationUpdate(navState);
  }

  buildChildren() {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app });
    });
  }

  render() {
    const { 
      app,
      children,
      hasSecondary,
      isOpen,
      requestNavigationUpdate,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-BaseSecondary',
      customProps.className,
    ]);

    let onButtonClick;
    if (hasSecondary) {
      onButtonClick = this.handleNavButtonClick;
    }
    const header = <NavigationHeader onButtonClick={onButtonClick} />;

    return (
      <div {...customProps} className={navigationClassNames}>
        <ContentContainer fill header={header}>
          {this.buildChildren()}
        </ContentContainer>
      </div>
    );
  }
}

BasePrimary.propTypes = propTypes;
BasePrimary.defaultProps = defaultProps;

export default BasePrimary;
