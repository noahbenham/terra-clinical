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
   * Whether or not the panel transitions should be animated.
   */
  isToggleEnabled: PropTypes.bool,
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
  isToggleEnabled: false,
  panelBehavior: 'overlay',
};

const McPanel = ({
  mainContent,
  onRequestClose,
  panelContent,
  panelBehavior,
  isAnimated,
  isOpen,
  isToggleEnabled,
  size,
  toggleMenu,
  ...customProps
  }) => {
  const isTiny = size === 'tiny';
  const compactSize = isTiny || size === 'small';
  const isOverlay = compactSize ? true : panelBehavior === 'overlay';
  const isOverlayOpen = isOpen && isOverlay && isToggleEnabled;
  const overlayBackground = compactSize ? 'dark' : 'clear';

  const slidePanelClassNames = cx([
    'mc-panel',
    { 'is-open': isOpen && isToggleEnabled },
    { 'use-widescreen-style': !compactSize && isToggleEnabled },
    { 'is-overlay': isOverlay },
    { 'is-squish': !isOverlay },
    customProps.className,
  ]);

  const panelClasses = cx([
    'panel',
    { 'is-tiny': isTiny },
    { 'is-animated': isAnimated },
  ]);

  let container;
  if (isToggleEnabled) {
    container = (
      <div className={panelClasses} aria-hidden={!isOpen ? 'true' : null}>
        <McContainer
          onClick={toggleMenu}
          isMenuEnabled={!isOpen}
          isHoverEnabled={!compactSize && isOverlay}
          onHoverOff={() => { if (isOpen) { toggleMenu(); } }}
          onHoverOn={() => { if (!isOpen) { toggleMenu(); } }}
        >
          {panelContent}
        </McContainer>
      </div>
    );
  }

  return (
    <div
      {...customProps}
      className={slidePanelClassNames}
    >
      {container}
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
