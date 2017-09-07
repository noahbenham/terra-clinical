import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Button from 'terra-button';
import DemographicsBanner from 'terra-demographics-banner';
import Image from 'terra-image';
import IconChecklist from 'terra-icon/lib/icon/IconChecklist';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import IconClose from 'terra-icon/lib/icon/IconClose';
import ContentContainer from 'terra-content-container';
import AppDelegate from 'terra-app-delegate';

import SkinnyToolbar from '../../common/skinny-toolbar/SkinnyToolbar';
import Chart from './chart/Chart';
import RoutingManagerDelegate from '../../common/RoutingManagerDelegate';

import { disclosureKey as patientSearchDisclosureKey } from './patient-search/PatientSearch';
import PatientList from './patient-list/PatientList';
import PatientSchedule from './patient-schedule/PatientSchedule';

const propTypes = {
  app: AppDelegate.propType,
  routingManager: RoutingManagerDelegate.propType,
};

class PatientContext extends React.Component {
  constructor(props) {
    super(props);

    this.chartRoute = this.chartRoute.bind(this);
    this.getComponentForDisclosureType = this.getComponentForDisclosureType.bind(this);
    this.launchPatientSearch = this.launchPatientSearch.bind(this);
    this.launchPatientSchedule = this.launchPatientSchedule.bind(this);
    this.launchPatientList = this.launchPatientList.bind(this);

    this.updateSelectedPatient = this.updateSelectedPatient.bind(this);
    this.updatePatientFromEvent = this.updatePatientFromEvent.bind(this);

    this.state = {
      patientContext: undefined,
      currentDisclosureType: undefined,
    };
  }

  componentDidMount() {
    document.addEventListener('showPatientList', this.launchPatientList);
    document.addEventListener('showPatientSchedule', this.launchPatientSchedule);
    document.addEventListener('showPatientSearch', this.launchPatientSearch);

    document.addEventListener('patientContext:patientSelected', this.updatePatientFromEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('showPatientList', this.launchPatientList);
    document.removeEventListener('showPatientSchedule', this.launchPatientSchedule);
    document.removeEventListener('showPatientSearch', this.launchPatientSearch);

    document.removeEventListener('patientContext:patientSelected', this.updatePatientFromEvent);
  }

  updatePatientFromEvent(event) {
    this.updateSelectedPatient(event.detail.patientData);
  }

  launchPatientSearch() {
    this.props.app.disclose({
      preferredType: 'modal',
      content: {
        key: 'PATIENT_SEARCH_MODAL',
        name: patientSearchDisclosureKey,
      },
    });
  }

  launchPatientList() {
    if (this.props.routingManager && this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
      this.props.routingManager.toggleMenu();
    }

    this.setState({
      currentDisclosureType: 'patientList',
    });
  }

  launchPatientSchedule() {
    if (this.props.routingManager && this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
      this.props.routingManager.toggleMenu();
    }
    
    this.setState({
      currentDisclosureType: 'patientSchedule',
    });
  }

  updateSelectedPatient(patientData) {
    this.forceRedirect = true;

    this.setState({
      patientContext: {
        id: patientData.id,
        name: patientData.name,
      },
      currentDisclosureType: undefined,
    });
  }

  getComponentForDisclosureType() {
    const { currentDisclosureType } = this.state;

    if (currentDisclosureType === 'patientList') {
      return (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            alignContent: 'stretch',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
          }}
        >
          <div style={{ flex: '0 0 60%', minWidth: '360px', backgroundColor: 'white' }}>
            <PatientList
              dismissPatientContextDisclosure={() => {
                this.setState({
                  currentDisclosureType: undefined,
                });
              }}
            />
          </div>
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.1)', flex: '1 1 auto' }}
            onClick={() => {
              this.setState({
                currentDisclosureType: undefined,
              });
            }}
          >
          </div>
        </div>
      );
    } else if (currentDisclosureType === 'patientSchedule') {
      return (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            alignContent: 'stretch',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
          }}
        >
          <div style={{ flex: '0 0 60%', minWidth: '360px', backgroundColor: 'white' }}>
            <PatientSchedule
              dismissPatientContextDisclosure={() => {
                this.setState({
                  currentDisclosureType: undefined,
                });
              }}
            />
          </div>
          <div
            style={{ backgroundColor: 'rgba(0,0,0,0.1)', flex: '1 1 auto' }}
            onClick={() => {
              this.setState({
                currentDisclosureType: undefined,
              });
            }}
          >
          </div>
        </div>
      );
    }


    return undefined;
  }

  chartRoute() {
    const { routingManager, app } = this.props;

    return (
      <Route
        path="/patients/chart"
        render={({ match, location }) => (
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
              <Chart routingManager={routingManager} app={app} match={match} location={location} />
            </ContentContainer>
          ) : <Redirect to="/patients" />
        )}
      />
    );
  }

  noPatientsRoute() {
    return (
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
    );
  }

  render() {
    const { routingManager } = this.props;

    if (this.forceRedirect) {
      this.forceRedirect = false;

      return (
        <Redirect to="/patients" />
      );
    }
    const componentForDisclosure = this.getComponentForDisclosureType();

    let toolbarContent;
    if (['tiny', 'small'].indexOf(routingManager.size) === -1) {
      toolbarContent = (
        <SkinnyToolbar
          buttons={
            <div style={{ display: 'inline-block' }}>
              <Button text="Patient List" icon={<IconChecklist style={{ marginRight: '5px' }} />} size="medium" variant="link" onClick={this.launchPatientList} />
              <Button text="Schedule" icon={<IconCalendar style={{ marginRight: '5px' }} />} size="medium" variant="link" onClick={this.launchPatientSchedule} />
              <Button text="Patient Search" icon={<IconSearch style={{ marginRight: '5px' }} />} size="medium" variant="link" onClick={this.launchPatientSearch} />
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
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
              <Switch>
                {this.chartRoute()}
                {this.noPatientsRoute()}
              </Switch>
            </div>
            {componentForDisclosure}
          </div>
        </ContentContainer>
      </div>
    );
  }
}

PatientContext.propTypes = propTypes;

export default withRouter(PatientContext);
