import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import Button from 'terra-button';

import './PatientSchedule.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  patientSelectedCallback: PropTypes.func,
};

class PatientSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.patientSelected = this.patientSelected.bind(this);
  }

  patientSelected() {
    if (this.patientSelectedCallback) {
      this.patientSelectedCallback();
    }
  }

  render() {
    const {
      app,
      ...customProps
    } = this.props;

    return (
      <div className="terraClinical-PatientSchedule">
        <Button text="Select Patient" className="terraClinical-PatientSchedule-select" icon={<IconCalendar />} onClick={this.patientSelected} />
      </div>
    );
  }
}

PatientSchedule.propTypes = propTypes;

export default PatientSchedule;
