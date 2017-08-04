import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Button from 'terra-button';

class PatientContext extends React.Component {
  constructor(props) {
    super(props);

    this.launchPatientSearch = this.launchPatientSearch.bind(this);
    this.launchPatientSchedule = this.launchPatientSchedule.bind(this);

    console.log('PatientContextConstructor');
    this.state = {
      patientContext: undefined,
    };
  }

  componentDidMount() {
    console.log('PatientContextMounted');
  }

  launchPatientSearch() {
    this.setState({
      patientContext: {
        id: 1,
        name: 'Rambo, John',
      },
    });
  }

  launchPatientSchedule() {
    this.setState({
      patientContext: {
        id: 2,
        name: 'Williams, Ash',
      },
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'lightgrey' }}>
        <h2>Patients</h2>
        <br />
        <Switch>
          <Route
            path="/patients/chart"
            render={({ match }) => (
              <div>
                <h3>Patient Chart</h3>
                <p>Name: {this.state.patientContext && this.state.patientContext.name}</p>
              </div>
            )}
          />
          <Route
            render={() => (
              <div>
                { this.state.patientContext && <Redirect to="/patients/chart" /> }
                <h3>Please select a patient.</h3>
                <Button text="Search" onClick={this.launchPatientSearch} />
                <Button text="Schedule" onClick={this.launchPatientSchedule} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default PatientContext;
