import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import NavigationSecondary from 'terra-clinical-navigation-secondary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import Logo from 'terra-clinical-navigation-primary/lib/Logo';

const logo = <Logo icon={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const secondaryContent1 = <div style={{ height: '100%', width: '100%', backgroundColor: 'red' }} />;
const secondary = (
  <NavigationSecondary content={secondaryContent1} />
);

const navigation = () => (
  <Navigation
    primary={<NavigationPrimary logo={logo}>{secondary}</NavigationPrimary>}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
