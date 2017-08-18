import React from 'react';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';

class PatientSearchModal extends React.Component {
  constructor(props) {
    super(props);

    this.selectPatient = this.selectPatient.bind(this);
  }

  selectPatient(patientData) {
    const { app } = this.props;

    return () => {
      document.dispatchEvent(new CustomEvent('patientContext:patientSelected', {
        detail: { patientData },
      }));
      app.dismiss();
    };
  }

  render() {
    const { app } = this.props;
    return (
      <div style={{ padding: '10px' }}>
        <h3>Patient Search</h3>
        <hr />
        <Button
          text="Select: John Rambo"
          onClick={this.selectPatient({ id: 3, name: 'Rambo, John' })}
        />
        <Button
          text="Select: Ash Williams"
          onClick={this.selectPatient({ id: 2, name: 'Williams, Ash' })}
        />
        <Button
          text="Select: Don Johnson"
          onClick={this.selectPatient({ id: 1, name: 'Johnson, Don' })}
        />
        <br />
        <Button
          text="Close"
          onClick={() => {
            app.dismiss();
          }}
        />
      </div>
    );
  }
}

const disclosureKey = 'PatientSearchModal';
AppDelegate.registerComponentForDisclosure(disclosureKey, PatientSearchModal);

export default PatientSearchModal;
export { disclosureKey };
