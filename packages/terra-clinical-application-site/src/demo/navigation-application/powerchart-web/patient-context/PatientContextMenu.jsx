import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MenuToolbar from '../../common/MenuToolbar';
import ChartMenu from './chart/ChartMenu';
import RoutingManagerDelegate from '../../common/RoutingManagerDelegate';

const PatientContextMenu = ({ match, routingManager, path, customProp }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
    <Switch>
      <Route
        path={`${path}/chart`}
        render={(props) => {
          return (
            <ChartMenu
              {...props}
              routingManager={RoutingManagerDelegate.clone(routingManager, {
                size: routingManager.size,
              })}
            />
          );
        }}
      />
      <Route
        render={() => (
          <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
            <MenuToolbar routingManager={routingManager} />
            <br />
            {customProp === 'HUGE' && <h1>HUGE</h1>}
            <br />
            <h2>Patients</h2>
            <br />
            <Link to={`${path}/1`}>Patient 1</Link>
            <br />
            <Link to={`${path}/2`}>Patient 2</Link>
            <br />
            <Link to={`${path}/3`}>Patient 3</Link>
            <br />
            <Link to={`${path}/chart`}>Chart</Link>
          </div>
        )}
      />
    </Switch>
  </div>
);

export default PatientContextMenu;
