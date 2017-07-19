import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconUnlock from 'terra-icon/lib/icon/IconUnlock';
import IconPadlock from 'terra-icon/lib/icon/IconPadlock';
import Button from 'terra-button';

import './NavigationMenuToolbar.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  navManager: NavManagerDelegate.propType,
};

class NavigationMenuToolbar extends React.Component {

  render() {
    const { 
      app,
      navManager,
      ...customProps
    } = this.props;

    const toolbarClassNames = classNames([
      'terraClinical-NavigationMenuToolbar',
      customProps.className,
    ]); 

    let backButton;
    if (navManager.presentParentMenu) {
      backButton = <Button onClick={navManager.presentParentMenu} icon={<IconReply />} />;
    }
    let rootButton;
    if (navManager.presentRootMenu) {
      rootButton = <Button onClick={navManager.presentRootMenu} icon={<IconHouse />} />;
    }
    let pinButton;
    if (navManager.pinMenu) {
      pinButton = <Button onClick={navManager.pinMenu} icon={<IconUnlock />} />;
    }
    let unpinButton;
    if (navManager.unpinMenu) {
      unpinButton = <Button onClick={navManager.unpinMenu} icon={<IconPadlock />} />;
    }
    let closeButton;
    if (navManager.closeMenu) {
      closeButton = <Button onClick={navManager.closeMenu} icon={<IconClose />} />;
    }

    let toolbarBody;
    if (backButton || rootButton || pinButton || unpinButton) {
      toolbarBody = (
        <div className="terraClinical-NavigationMenuToolbar-body">
          {backButton}
          {rootButton}
          {pinButton}
          {unpinButton}
        </div>
      );
    }

    return (
      <div {...customProps} className={toolbarClassNames}>
        {toolbarBody}
        {closeButton}
      </div>
    );
  }
}

NavigationMenuToolbar.propTypes = propTypes;

export default NavigationMenuToolbar;
