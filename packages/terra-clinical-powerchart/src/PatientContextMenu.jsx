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
  presentRootMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  presentParentMenu: PropTypes.func,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  toggleMenu: PropTypes.func,
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
      presentRootMenu,
      presentParentMenu,
      toggleMenu,
      size,
      ...customProps
    } = this.props;

    let button1;
    if (presentParentMenu) {
      button1 = <Button style={{ display: 'inline-block' }} onClick={presentParentMenu} icon={<IconReply />} />;
    }
    let button2;
    if (presentRootMenu) {
      button2 = <Button style={{ display: 'inline-block' }} onClick={presentRootMenu} icon={<IconHouse />} />;
    }
    let button3;
    if (toggleMenu) {
      button3 = <Button style={{ display: 'inline-block', float: 'right' }} onClick={toggleMenu} icon={<IconClose />} />;
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
