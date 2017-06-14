import React from 'react';
import NavigationHeader from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import NavigationSecondary from 'terra-clinical-navigation-secondary';

const navigation = () => (
  <NavigationHeader
    primary={<NavigationPrimary />}
    secondary={<NavigationSecondary />}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
