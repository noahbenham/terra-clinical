import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const goBackWrapper = (path, goBack) => (
  () => { goBack(path); }
);

const OrdersMenu = ({ match, routingManager }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'yellow' }}>
    {routingManager.presentParentMenu && <Button onClick={routingManager.presentParentMenu} text="Back" />}
    {routingManager.presentRootMenu && <Button onClick={routingManager.presentRootMenu} text="Home" />}
    {routingManager.pinMenu && <Button onClick={routingManager.pinMenu} text="Pin" />}
    {routingManager.unpinMenu && <Button onClick={routingManager.unpinMenu} text="Unpin" />}
  </div>
);

export default OrdersMenu;
