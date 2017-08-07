import React from 'react';
import classNames from 'classnames';
import { Switch, Route, Link } from 'react-router-dom';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../../common/MenuToolbar';

import './ChartMenu.scss';

const VerticalToolbar = (props) => {
  return (
    <div className="vertical-toolbar">
      {props.children}
    </div>
  );
};

const ChartMenu = ({ match, routingManager, path }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
    <ContentContainer
      header={<MenuToolbar routingManager={routingManager} />}
      fill
    >
      <div className="cm-container">
        <div className="cm-backRegion">
          <VerticalToolbar>
            <Button icon={<IconLeft />} variant="link" />
          </VerticalToolbar>
        </div>
        <div className="cm-contentRegion">
          <p>I am long text please let me wrap</p>
        </div>
      </div>
    </ContentContainer>
  </div>
);

export default ChartMenu;
