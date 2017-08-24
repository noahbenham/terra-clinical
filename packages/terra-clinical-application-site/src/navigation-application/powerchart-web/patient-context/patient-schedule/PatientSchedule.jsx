import React from 'react';
import Button from 'terra-button';

class PatientSchedule extends React.Component {
  static selectPatient(patientData) {
    return () => {
      document.dispatchEvent(new CustomEvent('patientContext:patientSelected', {
        detail: { patientData },
      }));
    };
  }

  render() {
    const { dismissPatientContextDisclosure } = this.props;

    let closeButton;
    if (dismissPatientContextDisclosure) {
      closeButton = (
        <Button
          text="Close"
          onClick={() => {
            dismissPatientContextDisclosure();
          }}
        />
      );
    }

    return (
      <div style={{ padding: '10px' }}>
        <h3>Patient Schedule</h3>
        <hr />
        <Button
          text="Select: John Rambo"
          onClick={PatientSchedule.selectPatient({ id: 3, name: 'Rambo, John' })}
        />
        <Button
          text="Select: Ash Williams"
          onClick={PatientSchedule.selectPatient({ id: 2, name: 'Williams, Ash' })}
        />
        <Button
          text="Select: Don Johnson"
          onClick={PatientSchedule.selectPatient({ id: 1, name: 'Johnson, Don' })}
        />
        <br />
        {closeButton}
      </div>
    );
  }
}

export default PatientSchedule;
