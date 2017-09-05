import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import Overlay from 'terra-overlay';
import Button from 'terra-button';
import McContainer from './McContainer';
import styles from './McPanel.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The component to display in the main content area.
   */
  mainContent: PropTypes.node,
  /**
   * The component to display in the panel content area.
   */
  panelContent: PropTypes.node,
  /**
   * The style of panel presentation. One of `overlay`, `squish`.
   */
  panelBehavior: PropTypes.oneOf(['overlay', 'squish']),
  /**
   * Whether or not the panel transitions should be animated.
   */
  isAnimated: PropTypes.bool,
  /**
   * Whether or not the panel should be displayed.
   */
  isOpen: PropTypes.bool,
  /**
   * Callback when the overlay close functionality is triggered.
   */
  onRequestClose: PropTypes.func,
  /**
   * Current breakpoint size.
   */
  size: PropTypes.string.isRequired,
  /**
   * Current breakpoint size.
   */
  toggleMenu: PropTypes.func,
};

const defaultProps = {
  isAnimated: false,
  isOpen: false,
  panelBehavior: 'overlay',
};

const McPanel = ({
  mainContent,
  onRequestClose,
  panelContent,
  panelBehavior,
  isAnimated,
  isOpen,
  size,
  toggleMenu,
  ...customProps
  }) => {
  const isTiny = size === 'tiny';
  const compactSize = isTiny || size === 'small';
  const isOverlay = compactSize ? true : panelBehavior === 'overlay';
  const isOverlayOpen = isOpen && isOverlay;
  const overlayBackground = isTiny ? 'dark' : 'light';

  const slidePanelClassNames = cx([
    'mc-panel',
    { 'is-open': isOpen },
    { 'use-widescreen-style': !compactSize },
    { 'is-overlay': isOverlay },
    { 'is-squish': !isOverlay },
    customProps.className,
  ]);

  const panelClasses = cx([
    'panel', 
    { 'is-tiny': isTiny },
    { 'is-animated': isAnimated },
  ]);

  return (
    <div
      {...customProps}
      className={slidePanelClassNames}
    >
      <div className={panelClasses} aria-hidden={!isOpen ? 'true' : null}>
        <McContainer onClick={toggleMenu} isHoverEnabled={!compactSize && isOverlay} onHoverOff={() => {if(isOpen){toggleMenu()}}} onHoverOn={() => {if(!isOpen){toggleMenu()}}}>
          {panelContent}
        </McContainer>
      </div>
      <div className={cx('main')}>
        <Overlay isRelativeToContainer onRequestClose={onRequestClose} isOpen={isOverlayOpen} backgroundStyle={overlayBackground} />
        {mainContent}
      </div>
    </div>
  );
};

McPanel.propTypes = propTypes;
McPanel.defaultProps = defaultProps;

export default McPanel;
