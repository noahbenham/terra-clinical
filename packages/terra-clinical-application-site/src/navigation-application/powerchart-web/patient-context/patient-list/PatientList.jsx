import React from 'react';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';

class PatientList extends React.Component {
  static selectPatient(patientData) {
    return () => {
      document.dispatchEvent(new CustomEvent('patientContext:patientSelected', {
        detail: { patientData },
      }));
    };
  }

  render() {
    const { dismissPatientContextDisclosure } = this.props;
    return (
      <div style={{ padding: '10px' }}>
        <h3>Patient List</h3>
        <hr />
        <Button
          text="Select: John Rambo"
          onClick={PatientList.selectPatient({ id: 3, name: 'Rambo, John' })}
        />
        <Button
          text="Select: Ash Williams"
          onClick={PatientList.selectPatient({ id: 2, name: 'Williams, Ash' })}
        />
        <Button
          text="Select: Don Johnson"
          onClick={PatientList.selectPatient({ id: 1, name: 'Johnson, Don' })}
        />
        <br />
        <Button
          text="Close"
          onClick={() => {
            dismissPatientContextDisclosure();
          }}
        />
      </div>
    );
  }
}

export default PatientList;
