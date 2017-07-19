import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppDelegate from 'terra-app-delegate';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import 'terra-base/lib/baseStyles';
import './Navigation.scss';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node,
  contentParent: PropTypes.element,
  menuBreakpoint: PropTypes.oneOf(BREAKPOINTS),
  menuClass: PropTypes.func,
  menuProps: PropTypes.object,
  navManager: NavManagerDelegate.propType,
};

const defaultProps = {
  menuBreakpoint: 'tiny',
};

class Navigation extends React.Component {

  componentDidMount() {
    if (this.props.navManager.registerNavigation) {
      const menuData = {
        breakpoint: this.props.menuBreakpoint,
        class: this.props.menuClass,
        props: this.props.menuProps,
      };
      this.props.navManager.registerNavigation(this.props.navManager.index, menuData);
    }
  }

  componentWillUnmount() {
    if (this.props.navManager.deregisterNavigation) {
      this.props.navManager.deregisterNavigation(this.props.navManager.index);
    }
  }

  render() {
    const {
      app,
      children,
      contentParent,
      navManager,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]);

    const newManager = Object.assign({}, navManager, { index: navManager.index + 1});

    let childContent;
    if (children) {
      const newChildProps = {
        app,
        navManager: newManager,
      };

      childContent = React.Children.map(children, child => (
        React.cloneElement(child, newChildProps)
      ));
    }

    if (contentParent) {
      const newParentProps = {
        app,
        children: childContent,
        navManager: newManager,
      };
      childContent = React.cloneElement(contentParent, newParentProps);
    }

    return (
      <div {...customProps} className={navigationClassNames}>
        {childContent}
      </div>
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
Navigation.breakpoints = BREAKPOINTS;

export default Navigation;
