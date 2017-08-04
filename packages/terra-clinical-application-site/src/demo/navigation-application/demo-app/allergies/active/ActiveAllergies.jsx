import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const activeAllergies = path => (
  ({ match, location }) => (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'lightgrey' }}>
      <h2>Active Allergies</h2>
      {location.state && location.state.sort === 'alpha' && <h3>Alpha Sort</h3>}
      {location.state && location.state.sort === 'reverse_alpha' && <h3>Reverse Sort</h3>}
      <br />
      <Link
        replace
        to={{
          pathname: `${path}`,
          state: { sort: 'alpha' },
        }}
      >
        <Button text="Sort" isDisabled={location.state && location.state.sort === 'alpha'} />
      </Link>
      <Link
        replace
        to={{
          pathname: `${path}`,
          state: { sort: 'reverse_alpha' },
        }}
      >
        <Button text="Reverse Sort" isDisabled={location.state && location.state.sort === 'reverse_alpha'} />
      </Link>
    </div>
  )
);

export default activeAllergies('/allergies/active');
export { activeAllergies };
