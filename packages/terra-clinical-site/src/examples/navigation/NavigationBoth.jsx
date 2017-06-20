import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import NavigationSecondary from 'terra-clinical-navigation-secondary';
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

const secondaryContent1 = <div style={{ height: '100%', width: '100%', backgroundColor: 'red' }} />;
const secondaryContent2 = <div style={{ height: '100%', width: '100%', backgroundColor: 'green' }} />;
const secondaryContent3 = <div style={{ height: '100%', width: '100%', backgroundColor: 'black' }} />;

const secondary = (
  <NavigationSecondary content={secondaryContent1}>
    <NavigationSecondary content={secondaryContent2}>
      <NavigationSecondary>
        <NavigationSecondary content={secondaryContent3}>
        </NavigationSecondary>
      </NavigationSecondary>
    </NavigationSecondary>
  </NavigationSecondary>
);

const navigation = () => (
  <Navigation
    primary={<NavigationPrimary content={content} logo={logo}>{secondary}</NavigationPrimary>}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
