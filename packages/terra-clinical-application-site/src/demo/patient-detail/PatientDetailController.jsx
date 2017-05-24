import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import AppDelegate from 'terra-clinical-app-delegate';

import { injectReducer, injectSaga } from 'terra-clinical-redux';

import { loadPatient } from '../patient-concept/actions/patientActions';
import patientReducers from '../patient-concept/reducers/patientReducers';
import patientSagas from '../patient-concept/sagas/patientSagas';

import PatientDetail from './PatientDetail';

import { disclosureName as patientUpdateDisclosureName, reducers as patientUpdateReducers } from '../patient-update/PatientUpdateController';

const propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientId: PropTypes.string,
  patient: PropTypes.object,
  refreshPatient: PropTypes.func,
  isLoading: PropTypes.bool,
};

class PatientDetailController extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.presentPatientUpdate = this.presentPatientUpdate.bind(this);
  }

  componentDidMount() {
    if (!this.props.patient) {
      this.refresh();
    }
  }

  refresh() {
    this.props.refreshPatient();
  }

  presentPatientUpdate(patient, type) {
    this.props.app.disclose({
      preferredType: type,
      content: {
        key: `UPDATE_${this.props.physicianId}_${patient.id}`,
        name: patientUpdateDisclosureName,
        props: {
          physicianId: this.props.physicianId,
          patientId: patient.id,
        },
      },
    });
  }

  render() {
    const { app, patient, physicianId, patientId, ...customProps } = this.props;

    if (!this.props.patient) {
      return null; // <Placeholder app={app} headerText="Patient Detail" loadingText="Loading patient..." />;
    }

    return (
      <PatientDetail
        {...customProps}
        app={app}
        patient={this.props.patient}
        isLoading={this.props.isLoading}
        onRefresh={this.refresh}
        onSelectPatientUpdate={this.presentPatientUpdate}
      />
    );
  }
}

PatientDetailController.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  let foundPatient;
  Object.keys(state.patientState.patients).forEach((key) => {
    if (state.patientState.patients[key].id === ownProps.patientId) {
      foundPatient = state.patientState.patients[key];
    }
  });

  return {
    patient: foundPatient,
    isLoading: state.patientState.isLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshPatient: () => { dispatch(loadPatient(ownProps.physicianId, ownProps.patientId)); },
});

const connectedPatientDetailController = connect(mapStateToProps, mapDispatchToProps)(PatientDetailController);

export default connectedPatientDetailController;

const disclosureName = 'PatientDetailController';
AppDelegate.registerComponentForDisclosure(disclosureName, connectedPatientDetailController);
export { disclosureName };

const reducers = Object.assign({}, { patientState: patientReducers }, patientUpdateReducers);
export { reducers };

injectReducer('patientState', patientReducers);
injectSaga('patientSaga', patientSagas);
