import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const ActiveAllergiesMenu = ({ match, location, routingManager }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuchsia' }}>
      {routingManager.presentParentMenu && <Button onClick={routingManager.presentParentMenu} text="Back" />}
      {routingManager.presentRootMenu && <Button onClick={routingManager.presentRootMenu} text="Home" />}
      {routingManager.pinMenu && <Button onClick={routingManager.pinMenu} text="Pin" />}
      {routingManager.unpinMenu && <Button onClick={routingManager.unpinMenu} text="Unpin" />}
      <hr />
      <p>The ActiveAllergiesMenu uses location state to change the sort type. The URL does not change, and no new history entry is created.</p>
      <br />
      <p>This state is not persisted between navigations.</p>
      <hr />
      <Link
        replace
        to={{
          pathname: '/allergies/active',
          state: { sort: 'alpha' },
        }}
      >
        <Button text="Sort" />
      </Link>
      <Link
        replace
        to={{
          pathname: '/allergies/active',
          state: { sort: 'reverse_alpha' },
        }}
      >
        <Button text="Reverse Sort" />
      </Link>
    </div>
  );
};

export default ActiveAllergiesMenu;
