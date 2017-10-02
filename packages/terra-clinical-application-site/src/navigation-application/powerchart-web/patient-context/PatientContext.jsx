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
import PatientSearch from './patient-search/PatientSearch';

import './PatientContext.scss';

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

  // launchPatientSearch() {
  //   if (this.state.currentDisclosureType) {
  //     this.setState({
  //       currentDisclosureType: undefined,
  //     });
  //   }

  //   if (this.props.routingManager && this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
  //     this.props.routingManager.toggleMenu();
  //   }

  //   this.props.app.disclose({
  //     preferredType: 'modal',
  //     content: {
  //       key: 'PATIENT_SEARCH_MODAL',
  //       name: patientSearchDisclosureKey,
  //       props: { size: this.props.routingManager.size }
  //     },
  //   });
  // }

  launchPatientSearch() {
    if (this.props.routingManager && this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
      this.props.routingManager.toggleMenu();
    }

    if (this.state.currentDisclosureType === 'patientSearch') {
      this.setState({
        currentDisclosureType: undefined,
      });

      return;
    }

    this.setState({
      currentDisclosureType: 'patientSearch',
    });
  }

  launchPatientList() {
    if (this.props.routingManager && this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
      this.props.routingManager.toggleMenu();
    }

    if (this.state.currentDisclosureType === 'patientList') {
      this.setState({
        currentDisclosureType: undefined,
      });

      return;
    }

    this.setState({
      currentDisclosureType: 'patientList',
    });
  }

  launchPatientSchedule() {
    if (this.props.routingManager && this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
      this.props.routingManager.toggleMenu();
    }

    if (this.state.currentDisclosureType === 'patientSchedule') {
      this.setState({
        currentDisclosureType: undefined,
      });

      return;
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

  getComponentForDisclosureType(routingManager) {
    const { currentDisclosureType } = this.state;

    let content;
    if (currentDisclosureType === 'patientList') {
      content = (
        <PatientList
          dismissPatientContextDisclosure={() => {
            this.setState({
              currentDisclosureType: undefined,
            });
          }}
          routingManager={routingManager}
        />
      );
    } else if (currentDisclosureType === 'patientSchedule') {
      content = (
        <PatientSchedule
          dismissPatientContextDisclosure={() => {
            this.setState({
              currentDisclosureType: undefined,
            });
          }}
          routingManager={routingManager}
        />
      );
    } else if (currentDisclosureType === 'patientSearch') {
      content = (
        <PatientSearch
          dismissPatientContextDisclosure={() => {
            this.setState({
              currentDisclosureType: undefined,
            });
          }}
          routingManager={routingManager}
        />
      );
    }

    if (content) {
      if (['tiny', 'small'].indexOf(routingManager.size) >= 0) {
        let headerText;
        if (currentDisclosureType === 'patientList') {
          headerText = 'Patient List';
        } else if (currentDisclosureType === 'patientSchedule') {
          headerText = 'Patient Schedule';
        } else if (currentDisclosureType === 'patientSearch') {
          headerText = 'Patient Search';
        }

        return (
          <div className="pc-modal">
            <ContentContainer
              fill
              header={(
                <div style={{ height: '34px', background: '#DEDFE0', borderBottom: '#454545', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 auto' }}>
                    <p style={{ paddingLeft: '10px', color: '#404c57' }}>
                      {headerText}
                    </p>
                  </div>
                  <div style={{ flex: '0 0 auto' }}>
                    <Button
                      variant="link"
                      text="Close"
                      style={{ marginRight: '5px' }}
                      onClick={() => {
                        this.setState({
                          currentDisclosureType: undefined,
                        });
                      }}
                    />
                  </div>
                </div>
              )}
            >
              {content}
            </ContentContainer>
          </div>
        );
      }

      return (
        <div className="pc-panel">
          <div className="pc-panel-content">
            {content}
          </div>
          <div
            className="pc-panel-target"
          >
            <button
              className="pc-panel-target-button"
              aria-label="Close Patient Selection Panel"
              onClick={() => {
                this.setState({
                  currentDisclosureType: undefined,
                });
              }}
            />
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
    const componentForDisclosure = this.getComponentForDisclosureType(routingManager);

    let listClassName = 'pc-button';
    let scheduleClassName = 'pc-button';
    let searchClassName = 'pc-button';
    if (this.state.currentDisclosureType === 'patientList') {
      listClassName += ' pc-selected';
    }
    if (this.state.currentDisclosureType === 'patientSchedule') {
      scheduleClassName += ' pc-selected';
    }
    if (this.state.currentDisclosureType === 'patientSearch') {
      searchClassName += ' pc-selected';
    }

    let toolbarContent;
    if (['tiny', 'small'].indexOf(routingManager.size) === -1) {
      toolbarContent = (
        <SkinnyToolbar
          buttons={
            <div className="pc-container">
              <div className="pc-start">
                <Button className={listClassName} text="Patient List" icon={<IconChecklist style={{ fontWeight: 'bold', marginRight: '5px' }} />} size="medium" variant="secondary" onClick={this.launchPatientList} />
                <Button className={scheduleClassName} text="Schedule" icon={<IconCalendar style={{ fontWeight: 'bold', marginRight: '5px' }} />} size="medium" variant="secondary" onClick={this.launchPatientSchedule} />
                <Button className={searchClassName} text="Patient Search" icon={<IconSearch style={{ fontWeight: 'bold', marginRight: '5px' }} />} size="medium" variant="secondary" onClick={this.launchPatientSearch} />
              </div>
            </div>
          }
        />
      );
    }

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
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
