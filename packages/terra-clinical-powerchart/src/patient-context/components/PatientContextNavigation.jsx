import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

import PatientContextToolbar from './PatientContextToolbar';
import PatientContextMenu from './PatientContextMenu';
import PatientSelectionLanding from './PatientSelectionLanding';
import PatientSchedule from '../../PatientSchedule';
import PatientSearch from '../../PatientSearch';
import patient_context_hoc, { reducers as patientContextReducers } from './patient_context_hoc';

import './PatientContextNavigation.scss';

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

AppDelegate.registerComponentForDisclosure('PatientSchedule', PatientSchedule);
AppDelegate.registerComponentForDisclosure('PatientSearch', PatientSearch);

class PatientContentNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.discloseSearch = this.discloseSearch.bind(this);
    this.discloseSchedule = this.discloseSchedule.bind(this);
  }

  discloseSearch() {
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `PatientSearch-${Date.now()}`,
          name: 'PatientSearch',
        },
      });
    }
  }

  discloseSchedule() {
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `PatientSearch-${Date.now()}`,
          name: 'PatientSearch',
        },
      });
    }
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

    const navProps = {
      app,
      contentParent: <ContentContainer header={<PatientContextToolbar app={app} onSelectSearch={this.discloseSearch} onSelectSchedule={this.discloseSchedule} />} fill />,
      deregisterNavigation,
      index,
      menuBreakpoint: 'huge',
      menuClass: PatientContextMenu,
      menuProps: {},
      registerNavigation,
      toggleMenu,
      size,
    };

    let content;
    if (navigationData.patient) {
      content = <PatientSelectionLanding />;
      // content = (
      //   <DemographicsManager patient={navigationData.patient}>
      //     <PatientChartNavigation key={navigationUpdateId} />
      //   </DemographicsManager>
      // );
    } else {
      content = <PatientSelectionLanding />;
    }

    return (
      <Navigation className="terraClinical-PatientContext" {...navProps}>
        {content}
      </Navigation>
    );
  }
}

PatientContentNavigation.propTypes = propTypes;
PatientContentNavigation.defaultProps = defaultProps;

export default navigation_hoc('PatientContext')(PatientContentNavigation);

const reducers = Object.assign({}, patientContextReducers, navigationReducers);
export { reducers };
