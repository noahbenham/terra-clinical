import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'terra-button';

const goBackWrapper = (path, goBack) => (
  () => { goBack(path); }
);

const ActiveAllergiesMenu = ({ match, location, goBack }) => {
  return (
    <div style={{ height: '100%', backgroundColor: 'fuchsia' }}>
      {goBack && <Button onClick={goBackWrapper(match.url, goBack)} text="Back" />}
      <hr />
      <p>The ActiveAllergiesMenu uses location state to change the sort type. The URL does not change, and no new history entry is created.</p>
      <br />
      <p>This is state is not persisted between navigations.</p>
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
