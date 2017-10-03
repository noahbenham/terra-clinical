import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

import RoutingManagerDelegate from '../../common/RoutingManagerDelegate';
import MenuToolbar from '../../common/menu-toolbar/MenuToolbar';
import PatientSearch from './patient-search/PatientSearch';
import PatientList from './patient-list/PatientList';
import PatientSchedule from './patient-schedule/PatientSchedule';
import './PatientContextMenu.scss';

const propTypes = {
  routingManager: RoutingManagerDelegate.propType,
};

class PatientContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionType: undefined,
    };
  }
  render() {
    const { routingManager } = this.props;

    let selectionComponent;
    if (this.state.selectionType === 'search') {
      selectionComponent = (
        <PatientSearch />
      );
    } else if (this.state.selectionType === 'list') {
      selectionComponent = (
        <PatientList />
      );
    } else if (this.state.selectionType === 'schedule') {
      selectionComponent = (
        <PatientSchedule />
      );
    }

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
        <ContentContainer
          header={<MenuToolbar text="Patients" routingManager={routingManager} />}
          fill
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', width: '100%' }}>
            <div style={{ flex: '0 0 auto', position: 'relative' }}>
              <Button
                className="pcm-link"
                isBlock
                text="Patient List" icon={<IconChecklist style={{ marginRight: '10px'}} />} size="medium" variant="link" onClick={() => {
                  document.dispatchEvent(new CustomEvent('showPatientList'));
                }}
              />
              <Button
                className="pcm-link"
                isBlock
                text="Schedule" icon={<IconCalendar style={{ marginRight: '10px'}} />} size="medium" variant="link" onClick={() => {
                  document.dispatchEvent(new CustomEvent('showPatientSchedule'));
                }}
              />
              <Button
                className="pcm-link"
                isBlock
                text="Patient Search" icon={<IconSearch style={{ marginRight: '10px'}} />} size="medium" variant="link" onClick={() => {
                  document.dispatchEvent(new CustomEvent('showPatientSearch'));
                }}
              />
            </div>
            <div style={{ flex: '1 1 auto', position: 'relative' }}>
              {selectionComponent}
            </div>
          </div>
        </ContentContainer>
      </div>
    );
  }
}

PatientContextMenu.propTypes = propTypes;

export default PatientContextMenu;
