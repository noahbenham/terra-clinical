import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const OrdersMenu = ({ match, goBack }) => (
  <div style={{ height: '100%', backgroundColor: 'yellow' }}>
    <ul>
      {goBack && <Button onClick={goBack} text="Managed Back" />}
      <li><Link to={match.url.substring(0, match.url.lastIndexOf('/orders'))}>Back</Link></li>
    </ul>
  </div>
);

export default OrdersMenu;
