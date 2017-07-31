import React from 'react';
import { Link } from 'react-router-dom';

const OrdersMenu = ({ match }) => (
  <div style={{ height: '100%', backgroundColor: 'yellow' }}>
    <ul>
      <li><Link to={match.url.substring(0, match.url.lastIndexOf('/orders'))}>Back</Link></li>
    </ul>
  </div>
);

export default OrdersMenu;
