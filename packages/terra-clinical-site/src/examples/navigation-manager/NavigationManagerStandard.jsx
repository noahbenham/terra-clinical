import React from 'react';
import Navigation, { reducers as navigationReducers } from 'terra-clinical-navigation';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import NavigationManager from 'terra-clinical-navigation-manager';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import MenuExample1 from './MenuExample1';
import CustomNavigationExample from './CustomNavigationExample';
import Application from 'terra-clinical-application';
import AppDelegate from 'terra-app-delegate';
import UtilityMenuExample from './UtilityMenuExample';

AppDelegate.registerComponentForDisclosure('UtilityMenuExample', UtilityMenuExample);

const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <NavigationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'Mr. Awesomeness'} />;
const menuContent1 = <MenuExample1 style={{ backgroundColor: 'red' }} />;

const manager = () => (
  <Application app={AppDelegate.create({})} reducers={[navigationReducers]}>
    <NavigationManager
      toolbar={<NavigationToolbar utility={utility} logo={logo} />}
      style={{ border: '1px solid black', height: '400px' }}
    >
      <Navigation menu={menuContent1} menuBreakpoint="huge" routes={{ customStuff: CustomNavigationExample }} />
    </NavigationManager>
  </Application>
);

export default manager;
