import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import BasePrimary from './_BasePrimary';
import BaseSecondary from './_BaseSecondary';

import './Navigation.scss';

const TINY_BREAKPOINT = 544;

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will be displayed within the content body of secondary navigation
   **/
  children: PropTypes.node,
  /**
   * Component that will managed primary navigation actions.
   **/
  primary: PropTypes.element,
  /**
   * Component that will managed secondary navigation actions.
   **/
  secondary: PropTypes.element,
};

const defaultProps = {
  children: [],
  primary: <BasePrimary />,
  secondary: <BaseSecondary />,
};

class NavigationPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isInitalState: true, isTiny: false, isPrimaryOpen: false, isSecondaryOpen: false };
    this.handleResize = this.handleResize.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.handleResize(window.innerWidth);
  }

  handleResize(newWidth) {
    if (this.state.isInitalState) {
      if (newWidth >= TINY_BREAKPOINT) {
        this.setState({ isInitalState: false, isTiny: false, isPrimaryOpen: false, isSecondaryOpen: false });
      } else if (newWidth < TINY_BREAKPOINT) {
        this.setState({ isInitalState: false, isTiny: true, isPrimaryOpen: false, isSecondaryOpen: false });
      }
    } else {
      if (this.state.isTiny && newWidth >= TINY_BREAKPOINT) {
        this.setState({ isInitalState: false, isTiny: false, isPrimaryOpen: false, isSecondaryOpen: false });
      } else if (!this.state.isTiny && newWidth < TINY_BREAKPOINT) {
        this.setState({ isInitalState: false, isTiny: true, isPrimaryOpen: false, isSecondaryOpen: false });
      }
    }
  }

  handleRequestOpenPrimary() {
    const newState = {
      isInitalState: this.state.isInitalState,
      isTiny: this.state.isTiny,
      isOpen: true,
      isSecondaryOpen: this.state.isSecondaryOpen,
    };
    this.setState(newState);
  }

  handleRequestClosePrimary() {
    const newState = {
      isInitalState: this.state.isInitalState,
      isTiny: this.state.isTiny,
      isOpen: false,
      isSecondaryOpen: this.state.isSecondaryOpen,
    };
    this.setState(newState);
  }

  handleRequestOpenSecondary() {
    const newState = {
      isInitalState: this.state.isInitalState,
      isTiny: this.state.isTiny,
      isPrimaryOpen: this.state.isPrimaryOpen,
      isSecondaryOpen: true,
    };
    this.setState(newState);
  }

  handleRequestCloseSecondary() {
    const newState = {
      isInitalState: this.state.isInitalState,
      isTiny: this.state.isTiny,
      isPrimaryOpen: this.state.isPrimaryOpen,
      isSecondaryOpen: false,
    };
    this.setState(newState);
  }

  buildPrimary(isTiny, requests, secondary) {
    const { app } = this.props;
    return React.cloneElement(child, { app, children: secondary, isTiny, isOpen: this.state.isPrimaryOpen, ...requests });
  }

  buildSecondary(isTiny, requests) {
    const { app, children, secondary } = this.props;
    return React.cloneElement(secondary, { app, children, isTiny, isOpen: this.state.isSecondaryOpen, ...requests });
  }

  isTinyWidth() {
    return window.innerWidth < TINY_BREAKPOINT;
  }

  render() {
    const { children, ...customProps } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-Navigation',
      customProps.className,
    ]); 

    const requests = {
      requestPrimaryOpen: this.handleRequestOpenPrimary,
      requestPrimaryClose: this.handleRequestClosePrimary,
      requestSecondaryOpen: this.handleRequestOpenSecondary,
      requestSecondaryClosed: this.handleRequestCloseSecondary,
    };

    const isTiny = this.state.isInitalState ? this.isTinyWidth() : this.state.isTiny;
    const secondary = this.buildSecondary(isTiny, requests);
    const primary = this.buildPrimary(isTiny, requests, secondary);

    return (
      <div {...customProps} className={navigationClassNames}>
        {primary}
      </div>
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
