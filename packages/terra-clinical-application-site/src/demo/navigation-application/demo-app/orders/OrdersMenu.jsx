import React from 'react';
import MenuToolbar from '../../common/MenuToolbar';
import { Link } from 'react-router-dom';

const OrdersMenu = ({ match, routingManager }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
    <MenuToolbar routingManager={routingManager} />
    <br />
    <h2>Orders</h2>
    <br />
    <h3>I am {routingManager.size}</h3>
    <br />
    <Link to="/orders">Orders</Link>
    <br />
    <Link to="/orders/allergies/active">Active Allergies</Link>
  </div>
);

export default OrdersMenu;
