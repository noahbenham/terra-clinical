import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
// import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../common/menu-toolbar/MenuToolbar';

const RootMenu = ({ match, routingManager, path }) => {

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
      <ContentContainer
        header={<MenuToolbar routingManager={routingManager} />}
        fill
      >
        <div style={{ padding: '10px' }}>
          <h3 style={{ paddingBottom: '5px' }}>Application Menu</h3>
          <hr />
          <br />
          <NavLink
            location={routingManager.browserLocation}
            to={`${match.path}patients`}
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            Patients
          </NavLink>
          <br />
          <br />
          <NavLink
            location={routingManager.browserLocation}
            to={`${match.path}messages`}
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            Messages
          </NavLink>
          <br />
          <br />
          <NavLink
            location={routingManager.browserLocation}
            to={`${match.path}alerts`}
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            Alerts
          </NavLink>
        </div>
      </ContentContainer>
    </div>
  );
};

export default RootMenu;
