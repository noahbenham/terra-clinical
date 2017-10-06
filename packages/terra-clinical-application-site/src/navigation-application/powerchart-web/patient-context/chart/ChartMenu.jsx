import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink } from 'react-router-dom';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';

import './ChartMenu.scss';

const linkForSection = (routingManager, match, section) => {
  if (section === 'summary') {
    return (
      <NavLink
        key="summary"
        className="cm-link"
        location={routingManager.browserLocation}
        to={`${match.path}/review`}
        activeStyle={{
          fontWeight: 'bold',
        }}
      >
        Review
      </NavLink>
    );
  } else if (section === 'orders') {
    return (
      <NavLink
        key="orders"
        className="cm-link"
        location={routingManager.browserLocation}
        to={`${match.path}/orders`}
        activeStyle={{
          fontWeight: 'bold',
        }}
      >
        Orders
      </NavLink>
    );
  } else if (section === 'documentation') {
    return (
      <NavLink
        key="documentation"
        className="cm-link"
        location={routingManager.browserLocation}
        to={`${match.path}/documents`}
        activeStyle={{
          fontWeight: 'bold',
        }}
      >
        Documents
      </NavLink>
    );
  }

  return null;
};

const ChartMenu = ({ match, routingManager, path, location, sections }) => (
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
                <div>
                  {sections.map(section => (linkForSection(routingManager, match, section)))}
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
