import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MenuToolbar from '../../../common/MenuToolbar';

const ChartMenu = ({ match, routingManager, path }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuschia' }}>
    <MenuToolbar routingManager={routingManager} />
    <h2>ChartMenu</h2>
  </div>
);

export default ChartMenu;
