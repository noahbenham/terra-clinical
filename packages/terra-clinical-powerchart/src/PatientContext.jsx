import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';
import PatientContextToolbar from './PatientContextToolbar';
import PatientContextMenu from './PatientContextMenu';
import PatientSchedule from './PatientSchedule';
import PatientSearch from './PatientSearch';

import './PatientContext.scss';

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
   * From `connect`. 
   **/
  patientContextData: PropTypes.shape({
    patientId: PropTypes.string.isRequired,
    encounterId: PropTypes.string,
    ppr: PropTypes.object,
  }),
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  registerNavigation: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  requestToggleMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  size: PropTypes.oneOf(Navigation.breakpoints),
};

const defaultProps = {
  index: 0,
  size: 'tiny',
};

AppDelegate.registerComponentForDisclosure('PatientSchedule', PatientSchedule);
AppDelegate.registerComponentForDisclosure('PatientSearch', PatientSearch);

class PatientContext extends React.Component {

  render() {
    const { 
      app,
      children,
      deregisterNavigation,
      index,
      patientContextData,
      registerNavigation,
      requestToggleMenu,
      size,
    } = this.props;

    if (patientContextData) {
      let contextHeader;
      if (size !== 'tiny') {
        contextHeader = <PatientContextToolbar app={app} />;
      }

      const navProps = {
        app,
        contentParent: <ContentContainer header={contextHeader} fill />,
        deregisterNavigation,
        index,
        menuBreakpoint: 'tiny',
        menuClass: PatientContextMenu,
        menuProps: {},
        registerNavigation,
        requestToggleMenu,
        size,      
      };

      return (
        <Navigation className="terraClinical-PatientContext" {...navProps} />
      );
    }

    return (
      <div className="terraClinical-PatientContext">
        <PatientSearch app={app} />
      </div>
    );
  }
}

PatientContext.propTypes = propTypes;
PatientContext.defaultProps = defaultProps;

export default PatientContext;
