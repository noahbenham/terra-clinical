import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationToolbar from 'terra-clinical-navigation-primary';
import NavigationManager from 'terra-clinical-navigation-secondary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import Logo from 'terra-clinical-navigation-toolbar/lib/Logo';
import Utility from 'terra-clinical-navigation-toolbar/lib/Utility';

const logo = <Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <Utility accessory={<IconProvider />} title={'Mr. Awesomeness'} />;
const menuContent1 = <div style={{ height: '100%', width: '100%', backgroundColor: 'red' }} />;
const menuContent2 = <div style={{ height: '100%', width: '100%', backgroundColor: 'green' }} />;
const menuContent3 = <div style={{ height: '100%', width: '100%', backgroundColor: 'orange' }} />;
const menuContent4 = <div style={{ height: '100%', width: '100%', backgroundColor: 'black' }} />;

const manager = () => (
  <NavigationManager
    toolbar={<NavigationToolbar utility={utility} logo={logo} />}
    style={{ border: '1px solid black', height: '400px' }}
  >
    <Navigation menu={menuContent1}>
      <Navigation menu={menuContent2}>
        <UnmanagedNavigation menu={menuContent3}>
          <Navigation menu={menuContent4}>
          </Navigation>
        </UnmanagedNavigation>
      </Navigation>
    </Navigation>
  </NavigationManager>
);

export default manager;
