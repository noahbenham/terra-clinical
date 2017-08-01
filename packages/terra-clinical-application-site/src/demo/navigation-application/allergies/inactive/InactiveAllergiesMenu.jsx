import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const goBackWrapper = (path, goBack) => (
  () => { goBack(path); }
);

const InactiveAllergiesMenu = ({ match, location, goBack }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'aqua' }}>
      {goBack && <Button onClick={goBackWrapper(match.url, goBack)} text="Back" />}
      <hr />
      <p>The InactiveAllergiesMenu uses a new route to change the sort type. The URL does changes, and a new history entry is created.</p>
      <br />
      <p>This is state is persisted between navigations (by the URL). The InactiveAllergies component can use Route components to flex its layout.</p>
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
