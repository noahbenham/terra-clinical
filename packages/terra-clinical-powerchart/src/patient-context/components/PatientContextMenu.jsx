import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconCalendar from 'terra-icon/lib/icon/IconCalendar';
import IconSearch from 'terra-icon/lib/icon/IconSearch';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';

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
  closeMenu: PropTypes.func,
  pinMenu: PropTypes.func,
  unpinMenu: PropTypes.func,
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
      presentRootMenu,
      presentParentMenu,
      closeMenu,
      pinMenu,
      unpinMenu,
    } = this.props;

    const toolbarProps = {
      presentRootMenu,
      presentParentMenu,
      closeMenu,
      pinMenu,
      unpinMenu,
    };

    return (
      <ContentContainer className="terraClinical-PatientContextMenu" header={<MenuToolbar {...toolbarProps} />} fill>
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
