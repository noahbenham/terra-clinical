import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import Button from 'terra-button';
import Popup from 'terra-popup';
import IconExpandMore from 'terra-icon/lib/icon/IconExpandMore';

import styles from './Utility.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The accessory element to be 
   * */
  accessory: PropTypes.element,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  app: AppDelegate.propType,
  /**
   * The content to be displayed within the utility popup.
   * */
  content: PropTypes.element,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  contentHeight: PropTypes.string,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  contentWidth: PropTypes.string,
  /**
   * Whehther or not the content of the utility popup should be displayed.
   * */
  isOpen: PropTypes.bool,
  /**
   * The function callback to be used when managing the utility popup state..
   * */
  onClick: PropTypes.func,
  /**
   * Callback function indicating a close condition was met, should be combined with isOpen for state management.
   * */
  onRequestClose: PropTypes.func,
  /**
   * Current breakpoint size that the coming from the layout.
   * */
  size: PropTypes.string,
  /**
   * The utility title to be displayed next to the accessory.
   * */
  title: PropTypes.string,
};

const Utility = ({
  accessory,
  app,
  content,
  contentHeight,
  contentWidth,
  isOpen,
  onClick,
  onRequestClose,
  size,
  title,
  ...customProps
}) => {
  const utilityClassNames = cx([
    'utility',
    { 'is-compact': size === 'tiny' || size === 'small' },
    customProps.className,
  ]);

  return (
    <div>
      <Popup
        isArrowDisplayed
        contentAttachment="top right"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        targetRef={() => document.getElementById('terra-clinical-nav-utils')}
        contentHeight={contentHeight}
        contentWidth={contentWidth}
      >
        {content}
      </Popup>
      <Button {...customProps} className={utilityClassNames} onClick={onClick} variant="link">
        {!!accessory && <div className={cx('accessory')}>{accessory}</div>}
        {!!title && size !== 'tiny' && <div className={cx('title')}>{title}</div>}
        {<IconExpandMore id="terra-clinical-nav-utils" />}
      </Button>
    </div>
  );
};

Utility.propTypes = propTypes;

export default Utility;
