import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Navigation from 'terra-clinical-navigation';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';
import PatientContextToolbar from '../PatientContextToolbar';
import PatientContextMenu from '../PatientContextMenu';
import PatientSchedule from '../PatientSchedule';
import PatientSearch from '../PatientSearch';
import PatientSelectionLanding from '../components/PatientSelectionLanding';

import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

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
  navigationData: PropTypes.string,
  updateNavigation: PropTypes.func,
};

const defaultProps = {
  index: 0,
  size: 'tiny',
};

AppDelegate.registerComponentForDisclosure('PatientSchedule', PatientSchedule);
AppDelegate.registerComponentForDisclosure('PatientSearch', PatientSearch);

class PatientContentNavigation extends React.Component {

  render() {
    const {
      app,
      registerNavigation,
      deregisterNavigation,
      index,
      toggleMenu,
      size,
    } = this.props;

    const navProps = {
      app,
      contentParent: <ContentContainer header={<PatientContextToolbar app={app} />} fill />,
      deregisterNavigation,
      index,
      menuBreakpoint: 'tiny',
      menuClass: PatientContextMenu,
      menuProps: {},
      registerNavigation,
      toggleMenu,
      size,
    };


    // if (navigationData.patient) {
    //   let contextHeader;
    //   if (size !== 'tiny') {
    //     contextHeader = <PatientContextToolbar app={app} />;
    //   }

    //   const navProps = {
    //     app,
    //     contentParent: <ContentContainer header={contextHeader} fill />,
    //     deregisterNavigation,
    //     index,
    //     menuBreakpoint: 'tiny',
    //     menuClass: PatientContextMenu,
    //     menuProps: {},
    //     registerNavigation,
    //     toggleMenu,
    //     size,
    //   };

    //   return (
    //     <Navigation className="terraClinical-PatientContext" {...navProps}>
    //       <PatientSelectionLanding />
    //     </Navigation>
    //   );
    // }

    return (
      <Navigation className="terraClinical-PatientContext" {...navProps}>
        <PatientSelectionLanding />
      </Navigation>
    );
  }
}

PatientContentNavigation.propTypes = propTypes;
PatientContentNavigation.defaultProps = defaultProps;

export default navigation_hoc('PatientContent')(PatientContentNavigation);
