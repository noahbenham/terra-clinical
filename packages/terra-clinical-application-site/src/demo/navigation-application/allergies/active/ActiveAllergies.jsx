import React from 'react';

const ActiveAllergies = ({ match, location }) => (
  <div>
    <h2>Active Allergies</h2>
    {location.state && location.state.sort === 'alpha' && <h3>Alpha Sort</h3>}
    {location.state && location.state.sort === 'reverse_alpha' && <h3>Reverse Sort</h3>}
  </div>
);

export default ActiveAllergies;
