import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppDelegate from 'terra-app-delegate';

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

  index: PropTypes.number,
  size: PropTypes.string,
  closeMenu: PropTypes.func,
  openMenu: PropTypes.func,
  registerNavigation: PropTypes.func,
  deregisterNavigation: PropTypes.func,
};

const defaultProps = {
  menuBreakpoint: 'tiny',
};

class Navigation extends React.Component {

  componentDidMount() {
    if (this.props.registerNavigation) {
      const menuData = {
        breakpoint: this.props.menuBreakpoint,
        class: this.props.menuClass,
        props: this.props.menuProps,
      };
      this.props.registerNavigation(this.props.index, menuData);
    }
  }

  componentWillUnmount() {
    if (this.props.deregisterNavigation) {
      this.props.deregisterNavigation(this.props.index);
    }
  }

  render() {
    const {
      app,
      children,
      contentParent,
      deregisterNavigation,
      index,
      menuBreakpoint,
      menuClass,
      menuProps,
      registerNavigation,
      openMenu,
      closeMenu,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]);

    let childContent;
    if (children) {
      const newChildProps = {
        app,
        index: index + 1,
        size,
        openMenu,
        closeMenu,
        registerNavigation,
        deregisterNavigation,
      };

      childContent = React.Children.map(children, child => (
        React.cloneElement(child, newChildProps)
      ));
    }

    if (contentParent) {
      const newParentProps = {
        app,
        openMenu,
        closeMenu,
        size,
        children: childContent,
        registerNavigation,
        deregisterNavigation,
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
