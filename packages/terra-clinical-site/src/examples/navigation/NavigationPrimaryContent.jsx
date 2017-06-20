import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import Logo from 'terra-clinical-navigation-primary/lib/Logo';
import PrimaryList from 'terra-clinical-navigation-primary/lib/PrimaryList';
import IconLightbulb from 'terra-icon/lib/icon/IconLightbulb';
import IconCalculator from 'terra-icon/lib/icon/IconCalculator';
import IconHospital from 'terra-icon/lib/icon/IconHospital';

const content = (
  <PrimaryList style={{ backgroundColor: 'pink' }}>
    <PrimaryList.Item icon={<IconLightbulb />} text="Light Bulb" />
    <PrimaryList.Item icon={<IconCalculator />} text="Calculator" />
    <PrimaryList.Item icon={<IconHospital />} text="Hospital" />
  </PrimaryList>
);
const logo = <Logo icon={<IconVisualization />} title={'Chart of My Awesomeness'} />;

const navigation = () => (
  <Navigation
    primary={<NavigationPrimary content={content} logo={logo} />}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
