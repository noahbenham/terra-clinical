import React from 'react';
import { Route, Link } from 'react-router-dom';
import Button from 'terra-button';

const InactiveAllergies = ({ match, location }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'lightgrey' }}>
    <h2>Inactive Allergies</h2>
    <Route path="/allergies/inactive/alpha_sort" render={() => (<h3>Alpha Sort</h3>)} />
    <Route path="/allergies/inactive/reverse_sort" render={() => (<h3>Reverse Sort</h3>)} />
    <br />
    <Link to="/allergies/inactive/alpha_sort">
      <Button text="Sort" isDisabled={location.pathname === '/allergies/inactive/alpha_sort'} />
    </Link>
    <Link to="/allergies/inactive/reverse_sort">
      <Button text="Reverse Sort" isDisabled={location.pathname === '/allergies/inactive/reverse_sort'} />
    </Link>
  </div>
);

export default InactiveAllergies;
