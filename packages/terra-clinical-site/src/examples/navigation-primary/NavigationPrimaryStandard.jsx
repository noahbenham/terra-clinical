import React from 'react';
import { Provider } from 'react-redux';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import EmptySecondary from  'terra-clinical-navigation-primary/lib/EmptySecondary';

const navigation = () => (
  <NavigationPrimary style={{height: '400px', width: '100%'}}>
    <EmptySecondary />
  </NavigationPrimary>
);

export default navigation;
