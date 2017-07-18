import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconPill from 'terra-icon/lib/icon/IconPill';
import IconList from 'terra-icon/lib/icon/IconList';
import IconDocuments from 'terra-icon/lib/icon/IconDocuments';

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
        <div>
          <Button icon={<IconList />} onClick={this.discloseSearch} text="Chart Summary" />
          <Button icon={<IconPill />} onClick={this.discloseSearch} text="Orders" />
          <Button icon={<IconDocuments />} onClick={this.discloseSearch} text="Doc" />
        </div>
      </ContentContainer>
    );
  }
}

PatientContextMenu.propTypes = propTypes;
PatientContextMenu.defaultProps = defaultProps;

export default PatientContextMenu;
