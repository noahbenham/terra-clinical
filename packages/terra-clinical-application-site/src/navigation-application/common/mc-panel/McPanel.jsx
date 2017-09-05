import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import Overlay from 'terra-overlay';
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
  ...customProps
  }) => {
  const slidePanelClassNames = cx([
    'mc-panel',
    { 'is-open': isOpen },
    customProps.className,
  ]);

  const behavior = size === 'tiny' || size === 'small' ? 'overlay' : panelBehavior;
  const isOverlayOpen = isOpen && behavior === 'overlay';
  const overlayBackground = size === 'tiny' ? 'dark' : 'light';

  return (
    <div
      {...customProps}
      className={slidePanelClassNames}
      data-mc-panel-panel-behavior={behavior}
    >
      <div className={cx(['panel', { compact: size === 'tiny' || size === 'small' }, { expanded: size !== 'tiny' && size !== 'small' }, { 'is-animated': isAnimated }])} aria-hidden={!isOpen ? 'true' : null}>
        {panelContent}
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
