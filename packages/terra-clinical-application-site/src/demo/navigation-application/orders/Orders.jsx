import React from 'react';

const Orders = ({ routingManager }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'lightgrey' }}>
    <h2>Orders</h2>
    <h3>I am {routingManager.size}</h3>
  </div>
);

export default Orders;
