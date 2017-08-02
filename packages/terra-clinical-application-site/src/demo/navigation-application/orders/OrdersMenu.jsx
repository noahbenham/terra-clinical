import React from 'react';
import MenuToolbar from '../common/MenuToolbar';

const OrdersMenu = ({ match, routingManager }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
    <MenuToolbar routingManager={routingManager} />
    <h3>I am {routingManager.size}</h3>
  </div>
);

export default OrdersMenu;
