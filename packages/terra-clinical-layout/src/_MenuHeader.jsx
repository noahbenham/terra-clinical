import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Button from 'terra-button';
import 'terra-base/lib/baseStyles';

import IconPin from './_IconPin';

import styles from './MenuHeader.scss';

const cx = classNames.bind(styles);

const propTypes = {
  text: PropTypes.string,
  togglePin: PropTypes.func,
  isPinned: PropTypes.bool,
};

const defaultProps = {
  isPinned: false,
};

const MenuHeader = ({ text, togglePin, isPinned, ...customProps }) => {
  const headerClassNames = cx([
    'header',
    customProps.className,
  ]);

  let pinButton;
  if (togglePin && !isPinned) {
    pinButton = <Button onClick={togglePin} icon={<IconPin className={cx(['icon', 'unlock'])} />} variant="link" className={cx('header-button')} />;
  }
  let unpinButton;
  if (togglePin && isPinned) {
    unpinButton = <Button onClick={togglePin} icon={<IconPin className={cx('icon')} />} variant="link" className={cx('header-button')} />;
  }

  const toolbarEnd = (
    <div className={cx('header-content-end')}>
      {pinButton}
      {unpinButton}
    </div>
  );

  return (
    <div {...customProps} className={headerClassNames}>
      <div className={cx('header-content-body')}>
        <h3 className={cx('header-display')}>{text}</h3>
      </div>
      {toolbarEnd}
    </div>
  );
};

MenuHeader.propTypes = propTypes;
MenuHeader.defaultProps = defaultProps;

export default MenuHeader;
