import React from 'react';
import { Link } from 'react-router-dom';
import MenuToolbar from '../common/MenuToolbar';

const AllergiesMenu = ({ match, location, routingManager }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'red' }}>
      <MenuToolbar routingManager={routingManager} />
      <br />
      <h2>Allergies</h2>
      <br />
      <ul>
        <li><Link to={'/allergies/active'}>Active Allergies</Link></li>
        <li><Link to={'/allergies/inactive'}>Inactive Allergies</Link></li>
      </ul>
    </div>
  );
};

export default AllergiesMenu;
