import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

import RoutingManagerDelegate from '../../common/RoutingManagerDelegate';
import MenuToolbar from '../../common/menu-toolbar/MenuToolbar';

const propTypes = {
  routingManager: RoutingManagerDelegate.propType,
  isTiny: PropTypes.bool,
};

const PatientContextMenu = ({ routingManager, isTiny }) => (
  <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
    <ContentContainer
      header={<MenuToolbar routingManager={routingManager} />}
      fill
    >
      <Button
        text="Patient List" icon={<IconChecklist />} size="medium" variant="link" onClick={() => {
          document.dispatchEvent(new CustomEvent('showPatientList'));
        }}
      />
      <br />
      <Button
        text="Schedule" icon={<IconCalendar />} size="medium" variant="link" onClick={() => {
          document.dispatchEvent(new CustomEvent('showPatientSchedule'));
        }}
      />
      <br />
      <Button
        text="Patient Search" icon={<IconSearch />} size="medium" variant="link" onClick={() => {
          document.dispatchEvent(new CustomEvent('showPatientSearch'));
        }}
      />
      <br />
      <hr />
      {isTiny && <h2>I AM TINY</h2>}
    </ContentContainer>
  </div>
);

PatientContextMenu.propTypes = propTypes;

export default PatientContextMenu;
