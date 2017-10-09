import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'terra-button';
import 'terra-base/lib/baseStyles';

import IconPin from './_IconPin';

import './MenuHeader.scss';

const propTypes = {
  text: PropTypes.string,
  togglePin: PropTypes.func,
  isPinned: PropTypes.bool,
};

const defaultProps = {
  isPinned: false,
};

const MenuHeader = ({ text, togglePin, isPinned, ...customProps }) => {
  const headerClassNames = classNames([
    'terraClinical-MenuHeader',
    customProps.className,
  ]);

  let pinButton;
  if (togglePin && !isPinned) {
    pinButton = <Button onClick={togglePin} icon={<IconPin className="terraClinical-Unlock" />} variant="link" style={{ outline: 'none' }} />;
  }
  let unpinButton;
  if (togglePin && isPinned) {
    unpinButton = <Button onClick={togglePin} icon={<IconPin />} variant="link" style={{ outline: 'none' }} />;
  }

  const toolbarEnd = (
    <div className="terraClinical-MenuHeader-end">
      {pinButton}
      {unpinButton}
    </div>
  );

  return (
    <div {...customProps} className={headerClassNames}>
      <div className="terraClinical-MenuHeader-body">
        <h3 style={{ margin: '0' }}>{text}</h3>
      </div>
      {toolbarEnd}
    </div>
  );
};

MenuHeader.propTypes = propTypes;
MenuHeader.defaultProps = defaultProps;

export default MenuHeader;
