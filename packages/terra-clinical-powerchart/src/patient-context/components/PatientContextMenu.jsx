import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import './PatientContextMenu.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  navManager: NavManagerDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  updateNavigation: PropTypes.func,
};

class PatientContextMenu extends React.Component {

  constructor(props) {
    super(props);
    this.discloseSearch = this.discloseSearch.bind(this);
    this.discloseSchedule = this.discloseSchedule.bind(this);
  }

  discloseSchedule() {
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `PatientSchedule-${Date.now()}`,
          name: 'PatientSchedule',
        },
      });
    }
  }

  discloseSearch() {
    this.props.updateNavigation({ patient: { id: 1, name: 'Pete' } });

    // if (this.props.app && this.props.app.disclose) {
    //   this.props.app.disclose({
    //     preferredType: 'modal',
    //     size: 'tiny',
    //     content: {
    //       key: `PatientSearch-${Date.now()}`,
    //       name: 'PatientSearch',
    //     },
    //   });
    // }
  }

  render() {
    const {
      navManager,
    } = this.props;

    return (
      <ContentContainer className="terraClinical-PatientContextMenu" header={<MenuToolbar navManager={navManager} />} fill>
        <div className="terraClinical-PatientContextMenu-schedule">
          <Button icon={<IconSearch />} onClick={this.discloseSearch} isBlock />
        </div>
        <div className="terraClinical-PatientContextMenu-search">
          <Button icon={<IconCalendar />} onClick={this.discloseSchedule} isBlock />
        </div>
      </ContentContainer>
    );
  }
}

PatientContextMenu.propTypes = propTypes;

export default PatientContextMenu;
