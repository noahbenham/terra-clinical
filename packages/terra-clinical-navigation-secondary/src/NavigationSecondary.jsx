import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ResponsiveElement from 'terra-responsive-element';
import SlidePanel from 'terra-slide-panel';

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
};

const defaultProps = {
  children: [],
};

class NavigationSecondary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
      'terraClinical-NavigationSecondary',
      customProps.className,
    ]);

    return (
      <div className={navigationClassNames}>
        {this.buildChildren()}
      </div>
    );
  }
}

NavigationSecondary.propTypes = propTypes;
NavigationSecondary.defaultProps = defaultProps;

export default NavigationSecondary;
