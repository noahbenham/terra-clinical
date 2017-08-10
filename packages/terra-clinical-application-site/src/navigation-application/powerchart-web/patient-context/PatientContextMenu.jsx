import React from 'react';
import classNames from 'classnames';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from '../../common/menu-toolbar/MenuToolbar';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

// import VerticalToolbar from '../../../common/vertical-toolbar/VerticalToolbar';
// import './ChartMenu.scss';

const PatientContextMenu = ({ match, routingManager, path, childRoutes, isTiny }) => {
  // let sidebarContent;
  // if (['tiny', 'small'].indexOf(routingManager.size) >= 0) {
  //   sidebarContent = (
  //     <VerticalToolbar>
  //       <Button icon={<IconChecklist />} variant="link" size="medium" />
  //       <Button icon={<IconCalendar />} variant="link" size="medium" />
  //       <Button icon={<IconSearch />} variant="link" size="medium" />
  //     </VerticalToolbar>
  //   );
  // }

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
      <ContentContainer
        header={<MenuToolbar routingManager={routingManager} />}
        fill
      >
        <Button text="Patient List" icon={<IconChecklist />} size="medium" variant="link" onClick={() => {
          document.dispatchEvent(new CustomEvent('showPatientList'));
        }} />
        <br />
        <Button text="Schedule" icon={<IconCalendar />} size="medium" variant="link" onClick={() => {
          document.dispatchEvent(new CustomEvent('showPatientSchedule'));
        }} />
        <br />
        <Button text="Patient Search" icon={<IconSearch />} size="medium" variant="link" onClick={() => {
          document.dispatchEvent(new CustomEvent('showPatientSearch'));
        }} />
        <br />
        <hr />
        {isTiny && <h2>I AM TINY</h2>}
      </ContentContainer>
    </div>
  );
};

export default PatientContextMenu;
