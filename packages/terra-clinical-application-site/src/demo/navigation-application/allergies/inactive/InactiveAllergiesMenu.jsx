import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';
import MenuToolbar from '../../common/MenuToolbar';

const InactiveAllergiesMenu = ({ match, location, routingManager }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'aqua' }}>
      <MenuToolbar routingManager={routingManager} />
      <br />
      <h2>Inactive Allergies</h2>
      <hr />
      <p>The InactiveAllergiesMenu uses a new route to change the sort type. The URL does changes, and a new history entry is created.</p>
      <br />
      <p>This state is persisted between navigations (by the URL). The InactiveAllergies component can use Route components to flex its layout.</p>
      <hr />
      <Link to="/allergies/inactive/alpha_sort">
        <Button text="Sort" isDisabled={location.pathname === '/allergies/inactive/alpha_sort'} />
      </Link>
      <Link to="/allergies/inactive/reverse_sort">
        <Button text="Reverse Sort" isDisabled={location.pathname === '/allergies/inactive/reverse_sort'} />
      </Link>
    </div>
  );
};

export default InactiveAllergiesMenu;
