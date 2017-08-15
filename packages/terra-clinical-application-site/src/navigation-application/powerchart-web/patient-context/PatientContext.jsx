import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Button from 'terra-button';
import DemographicsBanner from 'terra-demographics-banner';
import Image from 'terra-image';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import IconClose from 'terra-icon/lib/icon/IconClose';
import ContentContainer from 'terra-content-container';

import SkinnyToolbar from '../../common/skinny-toolbar/SkinnyToolbar';
import Chart from './chart/Chart';

class PatientContext extends React.Component {
  constructor(props) {
    super(props);

    this.launchPatientSearch = this.launchPatientSearch.bind(this);
    this.launchPatientSchedule = this.launchPatientSchedule.bind(this);
    this.launchPatientList = this.launchPatientList.bind(this);

    this.state = {
      patientContext: undefined,
    };
  }

  componentDidMount() {
    document.addEventListener('showPatientList', this.launchPatientList);
    document.addEventListener('showPatientSchedule', this.launchPatientSchedule);
    document.addEventListener('showPatientSearch', this.launchPatientSearch);
  }

  componentWillUnmount() {
    document.removeEventListener('showPatientList', this.launchPatientList);
    document.removeEventListener('showPatientSchedule', this.launchPatientSchedule);
    document.removeEventListener('showPatientSearch', this.launchPatientSearch);
  }

  launchPatientSearch() {
    this.forceRedirect = true;

    this.setState({
      patientContext: {
        id: 1,
        name: 'Rambo, John',
      },
    });
  }

  launchPatientList() {
    this.forceRedirect = true;

    this.setState({
      patientContext: {
        id: 1,
        name: 'Johnson, Don',
      },
    });
  }

  launchPatientSchedule() {
    this.forceRedirect = true;

    this.setState({
      patientContext: {
        id: 2,
        name: 'Williams, Ash',
      },
    });
  }

  render() {
    const { routingManager, location } = this.props;

    if (this.forceRedirect) {
      this.forceRedirect = false;

      return (
        <Redirect to="/patients" />
      );
    }

    let toolbarContent;
    if (['tiny', 'small'].indexOf(routingManager.size) === -1) {
      toolbarContent = (
        <SkinnyToolbar
          buttons={
            <div style={{ display: 'inline-block' }}>
              <Button text="Patient List" icon={<IconChecklist />} size="medium" variant="link" onClick={this.launchPatientList} />
              <Button text="Schedule" icon={<IconCalendar />} size="medium" variant="link" onClick={this.launchPatientSchedule} />
              <Button text="Patient Search" icon={<IconSearch />} size="medium" variant="link" onClick={this.launchPatientSearch} />
              {this.state.patientContext && <Button text="Remove" icon={<IconClose />} size="medium" variant="link" onClick={() => { this.setState({ patientContext: undefined }); }} />}
            </div>
          }
        />
      );
    }

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
        <ContentContainer
          fill
          header={toolbarContent}
        >
          <Switch>
            <Route
              path="/patients/chart"
              render={({ match, chartLocation }) => (
                this.state.patientContext ? (
                  <ContentContainer
                    fill
                    header={
                      <DemographicsBanner
                        age="25 Years"
                        dateOfBirth="May 9, 1993"
                        gender="Male"
                        gestationalAge="April 5, 2016"
                        identifiers={{ MRN: 12343, REA: '3JSDA' }}
                        photo={<Image alt="My Cat" src="http://lorempixel.com/50/50/animals/7/" />}
                        personName={this.state.patientContext && this.state.patientContext.name}
                      />
                    }
                  >
                    <Chart routingManager={routingManager} app={this.props.app} match={match} location={chartLocation} />
                  </ContentContainer>
                ) : <Redirect to="/patients" />
              )}
            />
            <Route
              render={() => (
                <div style={{ height: '100%' }}>
                  { this.state.patientContext && <Redirect to="/patients/chart" /> }
                  <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                      <h2>No Patient Selected</h2>
                    </div>
                  </div>
                </div>
              )}
            />
          </Switch>
        </ContentContainer>
      </div>
    );
  }
}

export default PatientContext;
