import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import Button from 'terra-button';

import './PatientContextToolbar.scss';

const propTypes = {
  onSelectSearch: PropTypes.func,
  onSelectSchedule: PropTypes.func,
};

class PatientContextToolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onSelectSearch,
      onSelectSchedule,
    } = this.props;

    return (
      <div className="terraClinical-PatientContextToolbar">
        <Button className="terraClinical-PatientContextToolbar-schedule" icon={<IconSearch />} onClick={onSelectSearch} />
        <Button className="terraClinical-PatientContextToolbar-search" icon={<IconCalendar />} onClick={onSelectSchedule} />
      </div>
    );
  }
}

PatientContextToolbar.propTypes = propTypes;

export default PatientContextToolbar;
