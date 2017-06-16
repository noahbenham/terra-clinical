import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationSecondary from 'terra-clinical-navigation-secondary';

const navigation = () => (
  <Navigation
    secondary={<NavigationSecondary />}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
