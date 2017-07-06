import React from 'react';
import Navigation, { reducers as navigationReducers } from 'terra-clinical-navigation';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import NavigationManager from 'terra-clinical-navigation-manager';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import MenuExample from './MenuExample';
import CustomNavigationExample from './CustomNavigationExample';
import Application from 'terra-clinical-application';
import AppDelegate from 'terra-app-delegate';
import UtilityMenuExample from './UtilityMenuExample';

AppDelegate.registerComponentForDisclosure('UtilityMenuExample', UtilityMenuExample);

const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <NavigationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'Mr. Awesomeness'} />;
const menuContent1 = <MenuExample style={{ backgroundColor: 'red' }} />;
const menuContent2 = <MenuExample style={{ backgroundColor: 'green' }} />;
const menuContent3 = <MenuExample style={{ backgroundColor: 'orange' }} />;
const menuContent4 = <MenuExample style={{ backgroundColor: 'black' }} />;

const manager = () => (
  <Application app={AppDelegate.create({})} reducers={navigationReducers}>
    <NavigationManager
      toolbar={<NavigationToolbar utility={utility} logo={logo} />}
      style={{ border: '1px solid black', height: '400px' }}
    >
      <Navigation menu={menuContent1} menuBreakpoint="huge">
        <Navigation menu={menuContent2} menuBreakpoint="huge">
          <Navigation menu={menuContent3}>
            <CustomNavigationExample menu={menuContent4} menuBreakpoint="huge">
            </CustomNavigationExample>
          </Navigation>
        </Navigation>
      </Navigation>
    </NavigationManager>
  </Application>
);

export default manager;
