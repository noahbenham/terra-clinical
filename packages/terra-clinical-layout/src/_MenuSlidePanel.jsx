import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import Overlay from 'terra-overlay';

import HoverMenu from './_HoverMenu';
import styles from './MenuSlidePanel.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The component to display in the main content area.
   */
  background: PropTypes.node,
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
   * The component to display in the main content area.
   */
  mainContent: PropTypes.node,
  /**
   * Callback when the overlay close functionality is triggered.
   */
  onRequestClose: PropTypes.func,
  /**
   * The style of panel presentation. One of `overlay`, `squish`.
   */
  panelBehavior: PropTypes.oneOf(['overlay', 'squish']),
  /**
   * The component to display in the panel content area.
   */
  panelContent: PropTypes.node,
  /**
   * Current breakpoint size.
   */
  size: PropTypes.string.isRequired,
  /**
   * Current breakpoint size.
   */
  toggleMenu: PropTypes.func,
  /**
   * String to display on menu hover target.
   */
  menuText: PropTypes.string,
};

const defaultProps = {
  isAnimated: false,
  isOpen: false,
  isToggleEnabled: false,
  panelBehavior: 'overlay',
};

const MenuSlidePanel = ({
  background,
  isAnimated,
  isOpen,
  isToggleEnabled,
  mainContent,
  onRequestClose,
  panelBehavior,
  panelContent,
  size,
  toggleMenu,
  menuText,
  ...customProps
  }) => {
  const isTiny = size === 'tiny';
  const isSmall = size === 'small';
  const compactSize = isTiny || isSmall;
  const isOverlay = compactSize ? true : panelBehavior === 'overlay';
  const isOverlayOpen = isOpen && isOverlay && isToggleEnabled;
  const overlayBackground = compactSize ? 'dark' : 'clear';

  const slidePanelClassNames = cx([
    'menu-slide-panel',
    { 'is-open': isOpen && isToggleEnabled },
    { 'use-widescreen-style': !compactSize && isToggleEnabled },
    { 'is-overlay': isOverlay },
    { 'is-squish': !isOverlay },
    customProps.className,
  ]);

  const panelClasses = cx([
    'panel',
    { 'is-tiny': isTiny },
    { 'is-small': isSmall },
    { 'is-animated': isAnimated },
  ]);

  let panel;
  if (isToggleEnabled) {
    panel = (
      <div className={panelClasses} aria-hidden={!isOpen ? 'true' : null}>
        <HoverMenu
          onClick={toggleMenu}
          isMenuEnabled={!isOpen}
          isHoverEnabled={!compactSize && isOverlay}
          onHoverOff={() => { if (isOpen) { toggleMenu(); } }}
          onHoverOn={() => { if (!isOpen) { toggleMenu(); } }}
          text={menuText}
        >
          {panelContent}
        </HoverMenu>
      </div>
    );
  }

  return (
    <div
      {...customProps}
      className={slidePanelClassNames}
    >
      {panel}
      {background}
      <div className={cx('main')}>
        <Overlay isRelativeToContainer onRequestClose={onRequestClose} isOpen={isOverlayOpen} backgroundStyle={overlayBackground} />
        {mainContent}
      </div>
    </div>
  );
};

MenuSlidePanel.propTypes = propTypes;
MenuSlidePanel.defaultProps = defaultProps;

export default MenuSlidePanel;
