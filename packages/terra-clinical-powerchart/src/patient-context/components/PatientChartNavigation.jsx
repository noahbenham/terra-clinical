import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

import PatientChartMenu from './PatientChartMenu';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  deregisterNavigation: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  index: PropTypes.number,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  registerNavigation: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  toggleMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  size: PropTypes.oneOf(Navigation.breakpoints),
  navigationUpdateId: PropTypes.string,
  navigationData: PropTypes.object,
  updateNavigation: PropTypes.func,
};

const defaultProps = {
  index: 0,
  size: 'tiny',
  navigationData: {},
};

class PatientChartNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      app,
      registerNavigation,
      deregisterNavigation,
      index,
      toggleMenu,
      size,
      navigationData,
      navigationUpdateId,
      updateNavigation,
    } = this.props;

    const demo = <div style={{ height: '40px', backgroundColor: 'blue', color: 'white' }}>DEMOGRAPHICS</div>;

    const navProps = {
      app,
      contentParent: <ContentContainer header={demo} fill />,
      deregisterNavigation,
      index,
      menuBreakpoint: 'huge',
      menuClass: PatientChartMenu,
      menuProps: {},
      registerNavigation,
      toggleMenu,
      size,
    };

    return (
      <Navigation className="terraClinical-PatientContext" {...navProps}>
        <div>Chart/Orders/Doc</div>
      </Navigation>
    );
  }
}

PatientChartNavigation.propTypes = propTypes;
PatientChartNavigation.defaultProps = defaultProps;

export default navigation_hoc('PatientChart')(PatientChartNavigation);

const reducers = Object.assign({}, navigationReducers);
export { reducers };
