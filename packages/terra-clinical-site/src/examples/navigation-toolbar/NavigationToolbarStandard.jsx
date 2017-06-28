import React from 'react';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import Logo from 'terra-clinical-navigation-toolbar/lib/Logo';
import Utility from 'terra-clinical-navigation-toolbar/lib/Utility';

const logo = <Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <Utility accessory={<IconProvider />} title={'Mr. Awesomeness'} />;

const header = () => (
  <NavigationToolbar utility={utility} logo={logo} />
);

export default header;
