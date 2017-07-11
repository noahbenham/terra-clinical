import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import PatientContextToolbar from './PatientContextToolbar';
import PatientSchedule from './PatientSchedule';
import PatientSearch from './PatientSearch';
import AppDelegate from 'terra-app-delegate';

import './PatientContext.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  children: PropTypes.node,
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
  requestToggleMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  size: PropTypes.oneOf(Navigation.breakpoints),
};

const defaultProps = {
  children: [],
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
      contentData,
      deregisterNavigation,
      index,
      registerNavigation,
      requestToggleMenu,
      size,
    } = this.props;

    const navProps = {
      app,
      deregisterNavigation,
      index,
      registerNavigation,
      requestToggleMenu,
      size,      
    };

    if (contentData) {
      let contextHeader;
      if (size !== 'tiny') {
        contextHeader = <PatientContextToolbar app={app} />;
      }

      const contentParent = <ContentContainer header={contextHeader} fill />;
      return (
        <Navigation className="terraClinical-PatientContext" contentParent={contentParent} {...navProps}>
          {children}
        </Navigation>
      );
    }

    return (
      <div className="terraClinical-PatientContext">
        {children}
      </div>
    );
  }
}

PatientContext.propTypes = propTypes;
PatientContext.defaultProps = defaultProps;

export default PatientContext;
