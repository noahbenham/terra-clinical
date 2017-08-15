import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink } from 'react-router-dom';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';

import './ChartMenu.scss';

const ChartMenu = ({ match, routingManager, path, location }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
      <ContentContainer
        header={<MenuToolbar routingManager={routingManager} />}
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
                    <h3 style={{ paddingBottom: '5px' }}>Chart Menu</h3>
                    <hr />
                    <br />
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
