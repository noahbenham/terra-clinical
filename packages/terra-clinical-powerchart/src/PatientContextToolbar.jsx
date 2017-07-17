import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import Button from 'terra-button';

import './PatientContextToolbar.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
};

class PatientContextToolbar extends React.Component {

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
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `PatientSearch-${Date.now()}`,
          name: 'PatientSearch',
        },
      });
    }
  }

  render() {
    const {
      app,
      ...customProps
    } = this.props;

    return (
      <div className="terraClinical-PatientContextToolbar">
        <Button className="terraClinical-PatientContextToolbar-schedule" icon={<IconSearch />} onClick={this.discloseSearch} />
        <Button className="terraClinical-PatientContextToolbar-search" icon={<IconCalendar />} onClick={this.discloseSchedule} />
      </div>
    );
  }
}

PatientContextToolbar.propTypes = propTypes;

export default PatientContextToolbar;
