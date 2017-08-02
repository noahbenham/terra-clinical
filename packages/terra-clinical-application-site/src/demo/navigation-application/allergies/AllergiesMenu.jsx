import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const goBackWrapper = (path, goBack) => (
  () => { goBack(path); }
);

const AllergiesMenu = ({ match, location, routingManager }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'red' }}>
      {routingManager.presentParentMenu && <Button onClick={routingManager.presentParentMenu} text="Back" />}
      {routingManager.presentRootMenu && <Button onClick={routingManager.presentRootMenu} text="Home" />}
      {routingManager.pinMenu && <Button onClick={routingManager.pinMenu} text="Pin" />}
      {routingManager.unpinMenu && <Button onClick={routingManager.unpinMenu} text="Unpin" />}
      <ul>
        <li><Link to={'/allergies/active'}>Active Allergies</Link></li>
        <li><Link to={'/allergies/inactive'}>Inactive Allergies</Link></li>
      </ul>
    </div>
  );
};

export default AllergiesMenu;
