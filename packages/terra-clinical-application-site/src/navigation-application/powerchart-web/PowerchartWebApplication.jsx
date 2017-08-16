import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import Application, { reducers as terraApplicationReducers } from 'terra-clinical-application';
import AppDelegate from 'terra-app-delegate';

import RoutingManager from '../common/RoutingManager';
import routeConfig from './routeConfig';

import chartReviewReducers from './patient-context/chart/review/reducers';
import chartReviewSagas from './patient-context/chart/review/sagas';

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(Object.assign({},
    terraApplicationReducers,
    { chartReview: chartReviewReducers },
  )),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

chartReviewSagas.map(saga => (sagaMiddleware.run(saga)));

// eslint-disable-next-line react/prefer-stateless-function
class PowerchartWebApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route
            render={routeProps => (
              <Application locale="en-US">
                <RoutingManager {...routeProps} routeConfig={routeConfig} />
              </Application>
            )}
          />
        </Router>
      </Provider>
    );
  }
}

PowerchartWebApplication.propTypes = {
  app: AppDelegate.propType,
};

export default PowerchartWebApplication;

