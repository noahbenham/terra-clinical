import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';

import './PatientContextMenu.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  requestOpenHomeMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  requestOpenParentMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  requestToggleMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  size: PropTypes.oneOf(Navigation.breakpoints),
};

const defaultProps = {
  size: 'tiny',
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
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      size,
      ...customProps
    } = this.props;

    let button1;
    if (requestOpenParentMenu) {
      button1 = <Button style={{ display: 'inline-block' }} onClick={requestOpenParentMenu} icon={<IconReply />} />;
    }
    let button2;
    if (requestOpenHomeMenu) {
      button2 = <Button style={{ display: 'inline-block' }} onClick={requestOpenHomeMenu} icon={<IconHouse />} />;
    }
    let button3;
    if (requestToggleMenu) {
      button3 = <Button style={{ display: 'inline-block', float: 'right' }} onClick={requestToggleMenu} icon={<IconClose />} />;
    }

    const headerButtons = (
      <div>
        {button1}
        {button2}
        {button3}
      </div>
    );

    return (
      <ContentContainer className="terraClinical-PatientContextMenu" header={headerButtons} fill>
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
PatientContextMenu.defaultProps = defaultProps;

export default PatientContextMenu;
