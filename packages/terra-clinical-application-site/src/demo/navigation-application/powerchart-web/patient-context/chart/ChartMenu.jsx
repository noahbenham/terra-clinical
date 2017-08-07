import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink } from 'react-router-dom';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';

import './ChartMenu.scss';

const VerticalToolbar = (props) => {
  return (
    <div className="vertical-toolbar">
      {props.children}
    </div>
  );
};

        // <div className="cm-backRegion">
        //   <VerticalToolbar>
        //     <Button icon={<IconLeft />} variant="link" />
        //   </VerticalToolbar>
        // </div>


const ChartMenu = ({ match, routingManager, path }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
    <ContentContainer
      header={<MenuToolbar routingManager={routingManager} />}
      fill
    >
      <div className="cm-container">
        <div className="cm-contentRegion">
          <div style={{ padding: '10px' }}>
            <h3 style={{ paddingBottom: '5px', borderBottom: '1px solid lightgrey' }}>Menu</h3>
            <br />
            <NavLink
              to={`${match.path}/review`}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Review
            </NavLink>
            <br />
            <br />
            <NavLink
              to={`${match.path}/orders`}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Orders
            </NavLink>
            <br />
            <br />
            <NavLink
              to={`${match.path}/documents`}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Documents
            </NavLink>
          </div>

        </div>
      </div>
    </ContentContainer>
  </div>
);

export default ChartMenu;
