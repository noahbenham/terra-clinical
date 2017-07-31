import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const InactiveAllergiesMenu = ({ match, location, goBack }) => {
  return (
    <div style={{ height: '100%', backgroundColor: 'red' }}>
      {goBack && <Button onClick={goBack} text="Back" />}
      <Button text="Sort A->Z" />
      <Button text="Sort Z->A" />
    </div>
  );
};

export default InactiveAllergiesMenu;
