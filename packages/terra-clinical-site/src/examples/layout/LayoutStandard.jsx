import React from 'react';
import Layout from 'terra-clinical-layout';

import ContentExample from './ContentExample';
import MenuExample from './MenuExample';
import ToolbarExample from './ToolbarExample';

const layout = () => (
  <Layout
    content={<ContentExample />}
    menu={<MenuExample />}
    toolbar={<ToolbarExample />}
    enableMenu
    menuText="Menu"
    style={{ height: '400px', width: '100%' }}
  />
);

export default layout;
