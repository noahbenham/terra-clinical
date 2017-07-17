import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
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
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  closeMenu: PropTypes.func,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  pinMenu: PropTypes.func,  
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  presentParentMenu: PropTypes.func,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  presentRootMenu: PropTypes.func,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  unpinMenu: PropTypes.func,
};

class NavigationMenuToolbar extends React.Component {

  render() {
    const { 
      app,
      closeMenu,
      pinMenu,
      presentParentMenu,
      presentRootMenu,
      unpinMenu,
      ...customProps
    } = this.props;

    const toolbarClassNames = classNames([
      'terraClinical-NavigationMenuToolbar',
      customProps.className,
    ]); 

    let backButton;
    if (presentParentMenu) {
      backButton = <Button onClick={presentParentMenu} icon={<IconReply />} />;
    }
    let rootButton;
    if (presentRootMenu) {
      rootButton = <Button onClick={presentRootMenu} icon={<IconHouse />} />;
    }
    let pinButton;
    if (pinMenu) {
      pinButton = <Button onClick={pinMenu} icon={<IconUnlock />} />;
    }
    let unpinButton;
    if (unpinMenu) {
      unpinButton = <Button onClick={unpinMenu} icon={<IconPadlock />} />;
    }
    let closeButton;
    if (closeMenu) {
      closeButton = <Button onClick={closeMenu} icon={<IconClose />} />;
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
