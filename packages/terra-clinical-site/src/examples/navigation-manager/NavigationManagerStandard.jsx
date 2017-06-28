import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import NavigationManager from 'terra-clinical-navigation-manager';
import UnmanagedNavigation from 'terra-clinical-navigation/lib/UnmanagedNavigation'
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import Logo from 'terra-clinical-navigation-toolbar/lib/Logo';
import Utility from 'terra-clinical-navigation-toolbar/lib/Utility';
import MenuExample from './MenuExample';
import CustomNavigationExample from './CustomNavigationExample';

const logo = <Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <Utility accessory={<IconProvider />} title={'Mr. Awesomeness'} />;
const menuContent1 = <MenuExample style={{ backgroundColor: 'red' }} />;
const menuContent2 = <MenuExample style={{ backgroundColor: 'green' }} />;
const menuContent3 = <MenuExample style={{ backgroundColor: 'orange' }} />;
const menuContent4 = <MenuExample style={{ backgroundColor: 'black' }} />;

const manager = () => (
  <NavigationManager
    toolbar={<NavigationToolbar utility={utility} logo={logo} />}
    style={{ border: '1px solid black', height: '400px' }}
  >
    <Navigation menu={menuContent1}>
      <Navigation menu={menuContent2}>
        <UnmanagedNavigation menu={menuContent3}>
          <CustomNavigationExample menu={menuContent4}>
          </CustomNavigationExample>
        </UnmanagedNavigation>
      </Navigation>
    </Navigation>
  </NavigationManager>
);

export default manager;
