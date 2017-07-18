import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import NavigationManager from 'terra-clinical-navigation-manager';
import AppDelegate from 'terra-app-delegate';
import Application, { reducers as terraApplicationReducers } from 'terra-clinical-application';
import PatientContextNavigation, { reducers as patientContextReducers }  from './patient-context/components/PatientContextNavigation';

import UtilityMenu from './UtilityMenu';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

AppDelegate.registerComponentForDisclosure('UtilityMenu', UtilityMenu);

const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'PowerChart Web'} />;
const utility = <NavigationToolbar.Utility accessory={<IconProvider />} title={'Name, User'} menuName="UtilityMenu" />;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(Object.assign({},
    terraApplicationReducers,
    patientContextReducers,
  )),
  composeEnhancers(),
);

const PowerChart = () => (
  <Provider store={store}>
    <Application app={AppDelegate.create({})}>
      <NavigationManager toolbar={<NavigationToolbar utility={utility} logo={logo} />} style={{ border: '1px solid black', height: '400px' }}>
        <PatientContextNavigation />
      </NavigationManager>
    </Application>
  </Provider>
);

export default PowerChart;
