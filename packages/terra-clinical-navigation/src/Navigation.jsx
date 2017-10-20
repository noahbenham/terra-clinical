import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';

import AppDelegate from 'terra-app-delegate';
import breakpoints from 'terra-responsive-element/lib/breakpoints.scss';
import { navigationConfigPropType, configHasMatchingRoute } from './RoutingConfigUtils';
import Layout from 'terra-clinical-layout';

const propTypes = {
  routeConfig: navigationConfigPropType,
  location: PropTypes.object,
  forceToggleAvailable: PropTypes.bool, // Need this to expose toggle when router is not used with layout
  app: AppDelegate.propType,
  applicationToolbar: PropTypes.element,
  menuRoutingVessel: PropTypes.element,
  contentRoutingVessel: PropTypes.element,
  menuText: PropTypes.string,
};

class Navigation extends React.Component {
  static getBreakpointSize() {
    const width = window.innerWidth;
    const { small, medium, large, huge } = breakpoints;

    if (width >= 1440) {
      return 'huge';
    } else if (width >= 1216) {
      return 'large';
    } else if (width >= 992) {
      return 'medium';
    } else if (width >= 768) {
      return 'small';
    }
    return 'tiny';
  }

  constructor(props) {
    super(props);

    this.updateSize = this.updateSize.bind(this);
    this.isCompactLayout = this.isCompactLayout.bind(this);
    this.renderApplicationToolbar = this.renderApplicationToolbar.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderContent = this.renderContent.bind(this);

    const initialSize = Navigation.getBreakpointSize();

    this.state = {
      toggleIsAvailable: configHasMatchingRoute(props.location.pathname, props.routeConfig.menuRoutes, initialSize) || props.forceToggleAvailable,
      size: initialSize,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    const toggleIsAvailable = configHasMatchingRoute(nextProps.location.pathname, nextProps.routeConfig.menuRoutes, this.state.size) || nextProps.forceToggleAvailable;

    if (toggleIsAvailable !== this.state.toggleIsAvailable) {
      this.setState({
        toggleIsAvailable,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    const newSize = Navigation.getBreakpointSize();

    if (this.state.size !== newSize) {
      const newToggleIsAvailable = configHasMatchingRoute(this.props.location.pathname, this.props.routeConfig.menuRoutes, newSize) || this.props.forceToggleAvailable;

      this.setState({
        size: newSize,
        toggleIsAvailable: newToggleIsAvailable,
      });
    }
  }

  isCompactLayout() {
    return this.state.size === 'tiny' || this.state.size === 'small';
  }

  decorateElement(element) {
    if (!element) {
      return null;
    }
    const { app, routeConfig } = this.props;
    const { size } = this.state;

    return React.cloneElement(element, {
      app,
      routingManager: {
        size,
        location,
        routeConfig,
      },
    });
  }

  render() {
    const { applicationToolbar, contentRoutingVessel, menuRoutingVessel, menuText, ...customProps } = this.props;

    return (
      <Layout
        {...customProps}
        header={this.decorateElement(applicationToolbar)}
        menu={this.decorateElement(menuRoutingVessel)}
        menuText={menuText}
      >
        {this.decorateElement(contentRoutingVessel)}
      </Layout>
    );
  }
}

Navigation.propTypes = propTypes;

export default withRouter(Navigation);
