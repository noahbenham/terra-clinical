import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const HomeMenu = ({ routingManager }) => (
  <div style={{ height: '100%', width: '100%', backgroundColor: 'lightseagreen', position: 'absolute' }}>
    {routingManager.presentParentMenu && <Button onClick={routingManager.presentParentMenu} text="Back" />}
    {routingManager.presentRootMenu && <Button onClick={routingManager.presentRootMenu} text="Home" />}
    {routingManager.pinMenu && <Button onClick={routingManager.pinMenu} text="Pin" />}
    {routingManager.unpinMenu && <Button onClick={routingManager.unpinMenu} text="Unpin" />}
    <ul>
      <li><Link to={{ pathname: '/allergies' }}>Allergies</Link></li>
      <li><Link to="/orders">Orders</Link></li>
    </ul>
  </div>
);

export default HomeMenu;
