import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChartReview from './review/ChartReview';

const Chart = ({ routingManager, app }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuschia' }}>
    <Switch>
      <Route
        path="/patients/chart/review"
        render={props => (
          <ChartReview routingManager={routingManager} app={app} {...props} />
        )}
      />
      <Route
        path="/patients/chart/orders"
        render={() => (
          <div style={{ height: '100%' }}>
            <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                <h2>No Orders</h2>
              </div>
            </div>
          </div>
        )}
      />
      <Route
        path="/patients/chart/documents"
        render={() => (
          <div style={{ height: '100%' }}>
            <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                <h2>No Documents</h2>
              </div>
            </div>
          </div>
        )}
      />
      <Route
        render={() => (
          <div style={{ height: '100%' }}>
            <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                <h2>Select a Chart Section</h2>
              </div>
            </div>
          </div>
        )}
      />
    </Switch>
  </div>
);

export default Chart;
