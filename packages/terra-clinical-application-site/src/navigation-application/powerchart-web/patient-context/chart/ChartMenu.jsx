import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink } from 'react-router-dom';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';

import './ChartMenu.scss';

const ChartMenu = ({ match, routingManager, path, location }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
    <ContentContainer
      header={<MenuToolbar text="Chart" routingManager={routingManager} />}
      fill
    >
      <div className="cm-container">
        <div className="cm-backRegion">
          {}
        </div>
        <div className="cm-contentRegion">
          <Switch>
            <Route
              path={match.path} render={() => (
                <div style={{ padding: '10px' }}>
                  <NavLink
                    location={routingManager.browserLocation}
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
                    location={routingManager.browserLocation}
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
                    location={routingManager.browserLocation}
                    to={`${match.path}/documents`}
                    activeStyle={{
                      fontWeight: 'bold',
                    }}
                  >
                    Documents
                  </NavLink>
                  <br />
                  <br />
                  <NavLink
                    location={routingManager.browserLocation}
                    to={`${match.path}/smart`}
                    activeStyle={{
                      fontWeight: 'bold',
                    }}
                  >
                    Smart
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

export default ChartMenu;
