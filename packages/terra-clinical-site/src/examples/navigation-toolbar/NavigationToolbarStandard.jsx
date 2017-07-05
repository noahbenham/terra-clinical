import React from 'react';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';

const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <NavigationToolbar.Utility accessory={<IconProvider />} title={'Mr. Awesomeness'} />;

const header = () => (
  <NavigationToolbar utility={utility} logo={logo} />
);

export default header;
