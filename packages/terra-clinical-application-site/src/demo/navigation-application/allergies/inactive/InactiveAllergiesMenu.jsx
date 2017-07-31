import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const InactiveAllergiesMenu = ({ match, location, goBack }) => {
  return (
    <div style={{ height: '100%', backgroundColor: 'red' }}>
      {goBack && <Button onClick={goBack} text="Back" />}
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
