import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

import './ChartMenu.scss';

const VerticalToolbar = (props) => {
  return (
    <div className="vertical-toolbar">
      {props.children}
    </div>
  );
};

const ChartMenu = ({ match, routingManager, path }) => {
  let sidebarContent;
  if (['tiny', 'small'].indexOf(routingManager.size) >= 0) {
    sidebarContent = (
      <VerticalToolbar>
        <Button icon={<IconChecklist />} variant="link" size="medium" />
        <Button icon={<IconCalendar />} variant="link" size="medium" />
        <Button icon={<IconSearch />} variant="link" size="medium" />
      </VerticalToolbar>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
      <ContentContainer
        header={<MenuToolbar routingManager={routingManager} />}
        fill
      >
        <div className="cm-container">
          <div className="cm-backRegion">
            {sidebarContent}
          </div>
          <div className="cm-contentRegion">
            <Switch>
              <Route
                path={`${match.path}/review`} render={() => (
                  <div style={{ padding: '10px' }}>
                    <Link to={match.path}>
                      <Button icon={<IconLeft />} variant="link" />
                    </Link>
                    <h3 style={{ paddingBottom: '5px', borderBottom: '1px solid lightgrey', display: 'inline' }}>Summary</h3>
                    <br />
                    <br />
                    <NavLink
                      to={`${match.path}/review/section1`}
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                    >
                      Section 1
                    </NavLink>
                    <br />
                    <br />
                    <NavLink
                      to={`${match.path}/review/section2`}
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                    >
                      Section 2
                    </NavLink>
                  </div>
                )}
              />
              <Route
                path={match.path} render={() => (
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
                )}
              />
            </Switch>

          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ChartMenu;
