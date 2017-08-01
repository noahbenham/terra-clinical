import React from 'react';
import { Route } from 'react-router-dom';

const InactiveAllergies = ({ match }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
    <h2>Inactive Allergies</h2>
    <Route path="/allergies/inactive/alpha_sort" render={() => (<h3>Alpha Sort</h3>)} />
    <Route path="/allergies/inactive/reverse_sort" render={() => (<h3>Reverse Sort</h3>)} />
  </div>
);

export default InactiveAllergies;
