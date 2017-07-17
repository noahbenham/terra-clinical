import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import Button from 'terra-button';

import './PatientSearch.scss';

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

class PatientSearch extends React.Component {

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
      <div className="terraClinical-PatientSearch">
        <Button text="Select Patient" className="terraClinical-PatientSearch-select" icon={<IconSearch />} onClick={this.patientSelected} />
      </div>
    );
  }
}

PatientSearch.propTypes = propTypes;

export default PatientSearch;
