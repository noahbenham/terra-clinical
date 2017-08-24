import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import IconLeft from 'terra-icon/lib/icon/IconLeft';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconUnlock from 'terra-icon/lib/icon/IconUnlock';
import IconPadlock from 'terra-icon/lib/icon/IconPadlock';
import Button from 'terra-button';

import RoutingManagerDelegate from '../RoutingManagerDelegate';
import './MenuToolbar.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  routingManager: RoutingManagerDelegate.propType,
  backButtonOverride: PropTypes.node,
  text: PropTypes.string,
};

const MenuToolbar = ({ routingManager, text, ...customProps }) => {
  const toolbarClassNames = classNames([
    'terraClinical-MenuToolbar',
    customProps.className,
  ]);

  let backButton;
  if (routingManager.goBack) {
    backButton = <Button onClick={routingManager.goBack} icon={<IconLeft />} variant="link" style={{ color: 'black' }} />;
  }

  let rootButton;
  if (routingManager.goToRoot) {
    rootButton = <Button onClick={routingManager.goToRoot} icon={<IconHouse />} variant="link" style={{ color: 'black' }} />;
  }
  let pinButton;
  if (routingManager.togglePin && !routingManager.menuIsPinned) {
    pinButton = <Button onClick={routingManager.togglePin} icon={<IconPadlock />} variant="link" style={{ color: 'black' }} />;
  }
  let unpinButton;
  if (routingManager.togglePin && routingManager.menuIsPinned) {
    unpinButton = <Button onClick={routingManager.togglePin} icon={<IconUnlock />} variant="link" style={{ color: 'black' }} />;
  }

  const toolbarStart = (
    <div className="terraClinical-MenuToolbar-start">
      {backButton}
      {rootButton}
    </div>
  );

  const toolbarEnd = (
    <div className="terraClinical-MenuToolbar-end">
      {pinButton}
      {unpinButton}
    </div>
  );

  return (
    <div {...customProps} className={toolbarClassNames}>
      {toolbarStart}
      <div className="terraClinical-MenuToolbar-body">
        <h3>{text}</h3>
      </div>
      {toolbarEnd}
    </div>
  );
};


MenuToolbar.propTypes = propTypes;

export default MenuToolbar;
