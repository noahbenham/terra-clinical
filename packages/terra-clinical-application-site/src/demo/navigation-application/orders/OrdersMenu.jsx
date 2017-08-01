import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const goBackWrapper = (path, goBack) => (
  () => { goBack(path); }
);

const OrdersMenu = ({ match, goBack }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
    <ul>
      {goBack && <Button onClick={goBackWrapper(match.url, goBack)} text="Back" />}
    </ul>
  </div>
);

export default OrdersMenu;
