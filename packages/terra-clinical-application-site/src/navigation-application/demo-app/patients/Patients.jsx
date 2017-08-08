import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Patients = () => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'lightgrey' }}>
    <h2>Patients</h2>
    <br />
    <Switch>
      <Route
        path="/patients/:id"
        render={({ match }) => (<h3>Selected Patient {match.params.id}</h3>)}
      />
      <Route render={() => (<h3>No patient selected</h3>)} />
    </Switch>
  </div>
);

export default Patients;
