import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import PatientChartMenu from './PatientChartMenu';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  navigationData: PropTypes.object,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  navManager: NavManagerDelegate.propType,
};

const defaultProps = {
  navigationData: {},
};

class PatientChartNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      app,
      navigationData,
      navManager,
    } = this.props;

    const demo = <div style={{ height: '40px', backgroundColor: 'blue', color: 'white' }}>DEMOGRAPHICS</div>;

    const navProps = {
      app,
      contentParent: <ContentContainer header={demo} fill />,
      menuBreakpoint: 'huge',
      menuClass: PatientChartMenu,
      menuProps: {},
      navManager,
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
