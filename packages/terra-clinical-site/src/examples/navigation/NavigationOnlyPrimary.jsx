import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';

const itemSection = <div style={{ border: '1px solid black', height: '30px', width: '200px', backgroundColor: 'blue' }}>items</div>;

const navigation = () => (
  <Navigation
    primary={<NavigationPrimary items={itemSection} icon={<IconVisualization />} title={'Chart of My Awesomeness'}/>}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
