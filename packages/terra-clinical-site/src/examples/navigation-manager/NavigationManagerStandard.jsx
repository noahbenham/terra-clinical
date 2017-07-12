import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import NavigationManager from 'terra-clinical-navigation-manager';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import FoodNavigation from './FoodNavigation';
import Application, { reducers as terraApplicationReducers } from 'terra-clinical-application';
import AppDelegate from 'terra-app-delegate';
import UtilityMenuExample from './UtilityMenuExample';
import { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

AppDelegate.registerComponentForDisclosure('UtilityMenuExample', UtilityMenuExample);

const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <NavigationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'Mr. Awesomeness'} />;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(Object.assign({},
    terraApplicationReducers,
    navigationReducers,
  )),
  composeEnhancers(),
);

const manager = () => (
  <Provider store={store}>
    <Application app={AppDelegate.create({})}>
      <NavigationManager
        toolbar={<NavigationToolbar utility={utility} logo={logo} />}
        style={{ border: '1px solid black', height: '400px' }}
      >
        <FoodNavigation navigationKey="NAV_FOOD_OM_NOM_NOM" />
      </NavigationManager>
    </Application>
  </Provider>
);

export default manager;
