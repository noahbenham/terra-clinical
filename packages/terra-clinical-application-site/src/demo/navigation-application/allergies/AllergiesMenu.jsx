import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const AllergiesMenu = ({ match, location, goBack }) => {
  return (
    <div style={{ height: '100%', backgroundColor: 'red' }}>
      <ul>
        {goBack && <Button onClick={goBack} text="Back" />}
      </ul>
    </div>
  );
};

export default AllergiesMenu;
