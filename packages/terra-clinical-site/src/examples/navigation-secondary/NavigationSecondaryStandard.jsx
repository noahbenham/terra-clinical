import React from 'react';
import { Provider } from 'react-redux';
import NavigationSecondary from 'terra-clinical-navigation-secondary';
import EmptyPrimary from  'terra-clinical-navigation-secondary/lib/EmptyPrimary';

const navigation = () => (
  <EmptyPrimary style={{height: '400px', width: '100%'}}>
  	<NavigationSecondary />
  </EmptyPrimary>
);

export default navigation;
