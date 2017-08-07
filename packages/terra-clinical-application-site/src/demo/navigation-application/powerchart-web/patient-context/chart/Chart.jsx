import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';

const Chart = ({ match, routingManager, path }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuschia' }}>
    <Switch>
      <Route path="/patients/chart/review" render={() => {
        return <div>Chart</div>
      }} />
      <Route path="/patients/chart/orders" render={() => {
        return <div>Orders</div>
      }} />
      <Route path="/patients/orders/documents" render={() => {
        return <div>Documents</div>
      }} />
      <Redirect to="/patients/chart/review" />
    </Switch>
  </div>
);

export default Chart;
