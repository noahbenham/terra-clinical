import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ChartReview from './review/ChartReview';
import SmartConsumer from './smart/SmartConsumer';

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
        path="/patients/chart/smart"
        render={props => (
          <SmartConsumer
            src="http://localhost:8000/fhir-app/launch.html?iss=https%3A%2F%2Ffhir-ehr.sandboxcerner.com%2Fdstu2%2F0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca&launch=151a1b76-c0e6-4e39-a6f5-efcb0adaf493"
          />
        )}
      />
      <Redirect to="/patients/chart/review" />
    </Switch>
  </div>
);

export default Chart;
