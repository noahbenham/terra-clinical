import React from 'react';
import NavigationHeader from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import NavigationSecondary from 'terra-clinical-navigation-secondary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';

const navigation = () => (
  <NavigationHeader
    primary={<NavigationPrimary icon={<IconVisualization />} title={'Chart of My Awesomeness'}/>}
    secondary={<NavigationSecondary />}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
