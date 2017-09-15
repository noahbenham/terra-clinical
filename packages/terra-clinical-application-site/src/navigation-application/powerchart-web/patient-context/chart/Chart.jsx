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
            src="https://smart.devcerner.com/smart/2c400054-42d8-4e74-87b7-80b5bd5fde9f/apps/a77a3d9a-28fe-4822-a96a-2ff09bed599a?PAT_PersonId=6625142&USR_PersonId=1380011&PAT_PPRCode=1116&username=ss025783&need_patient_banner=true"
          />
        )}
      />
      <Redirect to="/patients/chart/review" />
    </Switch>
  </div>
);

export default Chart;
