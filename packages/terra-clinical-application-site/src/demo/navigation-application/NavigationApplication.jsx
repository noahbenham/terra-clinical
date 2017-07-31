import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import Application, { reducers as terraApplicationReducers } from 'terra-clinical-application';
import AppDelegate from 'terra-app-delegate';

import PatientNavigation from './patient-navigation/PatientNavigation';

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(Object.assign({},
    terraApplicationReducers,
  )),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// eslint-disable-next-line react/prefer-stateless-function
class PatientApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Application locale="en-US">
          <PatientNavigation />
        </Application>
      </Provider>
    );
  }
}

PatientApplication.propTypes = {
  app: AppDelegate.propType,
};

export default PatientApplication;

