import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import BasePrimary from './_BasePrimary';
import BaseSecondary from './_BaseSecondary';

import './Navigation.scss';


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
    this.state = { size: 'default', isPrimaryOpen: false, isSecondaryOpen: false };
    this.handleResize = this.handleResize.bind(this);
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleResize() {
    const size = this.getBreakpointSize();
    if (size !== this.state.size) {
      this.setState({ size: size, isPrimaryOpen: false, isSecondaryOpen: false });
    }
  }

  handleRequestOpenPrimary() {
    if (!this.state.isPrimaryOpen) {
      this.setState({ isPrimaryOpen: true, isSecondaryOpen: this.state.isSecondaryOpen, size: this.state.size });
    }
  }

  handleRequestClosePrimary() {
    if (this.state.isPrimaryOpen) {
      this.setState({ isPrimaryOpen: false, isSecondaryOpen: this.state.isSecondaryOpen, size: this.state.size });
    }
  }

  handleRequestOpenSecondary() {
    if (!this.state.isSecondaryOpen) {
      this.setState({ isPrimaryOpen: this.state.isPrimaryOpen, isSecondaryOpen: true, size: this.state.size });
    }
  }

  handleRequestCloseSecondary() {
    if (this.state.isSecondaryOpen) {
      this.setState({ isPrimaryOpen: this.state.isPrimaryOpen, isSecondaryOpen: false, size: this.state.size });
    }
  }

  buildPrimary(size, requests, secondary) {
    const { app } = this.props;
    return React.cloneElement(child, { app, children: secondary, size, isOpen: this.state.isPrimaryOpen, ...requests });
  }

  buildSecondary(size, requests) {
    const { app, children, secondary } = this.props;
    return React.cloneElement(secondary, { app, children, size, isOpen: this.state.isSecondaryOpen, ...requests });
  }

  getBreakpointSize() {
    const width = window.innerWidth;
    const { tiny, small, medium, large, huge } = getBreakpoints();
    
    if (width >= huge) {
      return 'huge';
    } else if (width >= large) {
      return 'large';
    } else if (width >= medium) {
      return 'medium';
    } else if (width >= small) {
      return 'small';
    }
    return 'tiny';
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

    const size = this.state.size !== 'default' ? this.getBreakpointSize() : this.state.size;
    const secondary = this.buildSecondary(size, requests);
    const primary = this.buildPrimary(size, requests, secondary);

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
