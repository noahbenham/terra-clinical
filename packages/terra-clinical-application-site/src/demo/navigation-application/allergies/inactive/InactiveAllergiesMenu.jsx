import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const goBackWrapper = (path, goBack) => (
  () => { goBack(path); }
);

const InactiveAllergiesMenu = ({ match, location, routingManager }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'aqua' }}>
      {routingManager.presentParentMenu && <Button onClick={routingManager.presentParentMenu} text="Back" />}
      {routingManager.presentRootMenu && <Button onClick={routingManager.presentRootMenu} text="Home" />}
      {routingManager.pinMenu && <Button onClick={routingManager.pinMenu} text="Pin" />}
      {routingManager.unpinMenu && <Button onClick={routingManager.unpinMenu} text="Unpin" />}
      <hr />
      <p>The InactiveAllergiesMenu uses a new route to change the sort type. The URL does changes, and a new history entry is created.</p>
      <br />
      <p>This state is persisted between navigations (by the URL). The InactiveAllergies component can use Route components to flex its layout.</p>
      <hr />
      <Link to="/allergies/inactive/alpha_sort">
        <Button text="Sort" />
      </Link>
      <Link to="/allergies/inactive/reverse_sort">
        <Button text="Reverse Sort" />
      </Link>
    </div>
  );
};

export default InactiveAllergiesMenu;
