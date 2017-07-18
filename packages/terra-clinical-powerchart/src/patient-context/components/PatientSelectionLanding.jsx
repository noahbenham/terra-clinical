import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import IconClipboard from 'terra-icon/lib/icon/IconClipboard';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';

const propTypes = {
  onPatientListSelected: PropTypes.func,
  onPatientScheduleSelected: PropTypes.func,
  onPatientSearchSelected: PropTypes.func,
};

class PatientSelectionLanding extends React.Component {
  render() {
    const {
      onPatientListSelected,
      onPatientScheduleSelected,
      onPatientSearchSelected,
    } = this.props;

    return (
      <div >
        <h2>Select a patient using a method below</h2>
        <Button size="huge" text="Patient List" icon={<IconClipboard />} onClick={onPatientListSelected} />
        <Button size="huge" text="Schedule" icon={<IconCalendar />} onClick={onPatientScheduleSelected} />
        <Button size="huge" text="Search" icon={<IconSearch />} onClick={onPatientSearchSelected} />
      </div>
    );
  }
}

PatientSelectionLanding.propTypes = propTypes;

export default PatientSelectionLanding;
