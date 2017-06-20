import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import NavigationSecondary from 'terra-clinical-navigation-secondary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import Content from 'terra-clinical-navigation-primary/lib/Content';
import Logo from 'terra-clinical-navigation-primary/lib/Logo';
import ContentSection from 'terra-clinical-navigation-primary/lib/ContentSection';

const contentSection = <ContentSection><div style={{ border: '1px solid black', height: '30px', width: '200px', backgroundColor: 'blue' }}>items</div></ContentSection>;
const content = <Content>{contentSection}</Content>;
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
