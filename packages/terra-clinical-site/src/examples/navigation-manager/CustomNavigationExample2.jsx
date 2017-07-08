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

    return (
      <Navigation {...customProps} menuClass={MenuExample2} menuBreakpoint="tiny" menuRoutes={{ contentStuff: ContentShellExample }} contentParent={<CustomContentParent />} />
    );
  }
}

export default CustomNavigationExample;
