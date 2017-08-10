import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../../common/menu-toolbar/MenuToolbar';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

import VerticalToolbar from '../../../../common/vertical-toolbar/VerticalToolbar';
// import './ChartMenu.scss';

const ChartReviewMenu = ({ match, routingManager, path }) => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
      <ContentContainer
        header={<MenuToolbar routingManager={routingManager} />}
        fill
      >
        <div style={{ padding: '10px' }}>
          <h3 style={{ paddingBottom: '5px', display: 'inline' }}>Summary</h3>
          <hr />
          <br />
          <Link
            replace
            to={{
              pathname: match.path,
              state: {
                selectedSection: 'Section 1',
              },
            }}
          >
            Section 1
          </Link>
          <br />
          <br />
          <Link
            replace
            to={{
              pathname: match.path,
              state: {
                selectedSection: 'Section 2',
              },
            }}
          >
            Section 2
          </Link>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ChartReviewMenu;
