import React from 'react';

import AppDelegate from 'terra-app-delegate';

import RoutingManager from '../common/RoutingManager';
import routeConfig from './routeConfig';

import {
  HashRouter as Router,
} from 'react-router-dom';

class PatientNavigation extends React.Component {
  render() {
    return (
      <Router>
        <RoutingManager routeConfig={routeConfig} />
      </Router>
    );
  }
}

export default PatientNavigation;

const disclosureName = 'PatientNavigation';
AppDelegate.registerComponentForDisclosure(disclosureName, PatientNavigation);
export { disclosureName };
