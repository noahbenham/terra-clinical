import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const AllergiesMenu = ({ match, location, goBack }) => {
  return (
    <div style={{ height: '100%', backgroundColor: 'red' }}>
      {goBack && <Button onClick={goBack} text="Back" />}
      <ul>
        <li><Link to={'/allergies/active'}>Active Allergies</Link></li>
        <li><Link to={'/allergies/inactive'}>Inactive Allergies</Link></li>
      </ul>
    </div>
  );
};

export default AllergiesMenu;