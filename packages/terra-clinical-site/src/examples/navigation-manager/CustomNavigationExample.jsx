import React from 'react';
import Navigation from 'terra-clinical-navigation';
import MenuExample from './MenuExample';
import CustomContentParent from './CustomContentParent';

class CustomNavigationExample extends React.Component {
  render() {
    const { 
      ...customProps
    } = this.props;

    const menuContent2 = <MenuExample style={{ backgroundColor: 'green' }} />;
    return (
      <Navigation {...customProps} menu={menuContent2} menuBreakpoint="tiny" contentParent={<CustomContentParent />} />
    );
  }
}

export default CustomNavigationExample;
