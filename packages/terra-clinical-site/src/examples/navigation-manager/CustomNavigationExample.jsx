import React from 'react';
import Navigation from 'terra-clinical-navigation';
import MenuExample2 from './MenuExample2';
import CustomContentParent from './CustomContentParent';
import ContentShellExample from './ContentShellExample';

class CustomNavigationExample extends React.Component {
  render() {
    const { 
      ...customProps
    } = this.props;

    const menuContent2 = <MenuExample2 style={{ backgroundColor: 'green' }} />;
    return (
      <Navigation {...customProps} menu={menuContent2} menuBreakpoint="tiny" contentParent={<CustomContentParent />} routes={{ contentStuff: ContentShellExample }} />
    );
  }
}

export default CustomNavigationExample;
