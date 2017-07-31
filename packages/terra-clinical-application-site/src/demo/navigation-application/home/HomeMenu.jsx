import React from 'react';
import { Link } from 'react-router-dom';

const HomeMenu = ({ match, location, linkTo }) => (
  <div style={{ height: '100%', backgroundColor: 'green' }}>
    <ul>
      <li><Link to={{ pathname: '/allergies' }}>Allergies</Link></li>
      <li><Link to="/orders">Orders</Link></li>
    </ul>
  </div>
);

export default HomeMenu;
