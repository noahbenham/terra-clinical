import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';

import './BaseSecondary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
  hasPrimary: PropTypes.bool,
  size: PropTypes.string,
};

const defaultProps = {
  children: [],
  hasPrimary: false,
  isOpen: false,
  size: 'tiny',
};

class BaseSecondary extends React.Component {

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
      hasPrimary,
      isOpen,
      isPrimaryButtonEnabled,
      requestNavigationUpdate,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-BaseSecondary',
      customProps.className,
    ]);

    return (
      <div {...customProps} className={navigationClassNames}>
        {this.buildChildren()}
      </div>
    );
  }
}

BaseSecondary.propTypes = propTypes;
BaseSecondary.defaultProps = defaultProps;

export default BaseSecondary;
