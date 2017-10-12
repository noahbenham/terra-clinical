import React from 'react';
import PropTypes from 'prop-types';
import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';

import MenuSlidePanel from './_MenuSlidePanel';
import MenuHeader from './_MenuHeader';
import {
  getBreakpointSize,
  getCustomProps,
} from './utilities';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component.
   */
  app: AppDelegate.propType,
  /**
   * Element to be placed within the toolbar section of the layout.
   */
  toolbar: PropTypes.element,
  /**
   * Element to be placed within the main content section of the layout.
   */
  content: PropTypes.element,
  /**
   * Element to be placed within the menu section of the layout.
   */
  menu: PropTypes.element,
  /**
   * String used to decorate menu controls
   */
  menuText: PropTypes.string,
  /**
   * Flag to enable menu functionality. If not enabled, menu content will not be visible, and toggle
   * functionality will be hidden.
   */
  enableMenu: PropTypes.bool,
};

const defaultProps = {
  enableMenu: false,
};

const COMPACT_SIZES = ['tiny', 'small'];
const isSizeCompact = size => (
  COMPACT_SIZES.indexOf(size) >= 0
);

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePin = this.togglePin.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.isCompactLayout = this.isCompactLayout.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.state = {
      menuIsOpen: false,
      menuIsPinned: false,
      menuIsEnabled: props.enableMenu,
      size: getBreakpointSize(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      menuIsEnabled: nextProps.enableMenu,
      menuIsOpen: nextProps.enableMenu && this.state.menuIsOpen,
      menuIsPinned: nextProps.enableMenu && this.state.menuIsPinned,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    const newSize = getBreakpointSize();

    if (this.state.size !== newSize) {
      const newMenuIsPinned = this.props.enableMenu && !isSizeCompact(newSize) && this.state.menuIsPinned;
      const newMenuIsOpen = this.props.enableMenu && this.state.menuIsOpen && newMenuIsPinned;

      this.setState({
        size: newSize,
        menuIsOpen: newMenuIsOpen,
        menuIsPinned: newMenuIsPinned,
      });
    }
  }

  toggleMenu() {
    if (!this.state.menuIsPinned) {
      this.setState({
        menuIsOpen: !this.state.menuIsOpen,
      });
    }
  }

  togglePin() {
    this.setState({
      menuIsPinned: !this.state.menuIsPinned,
    });
  }

  isCompactLayout() {
    return isSizeCompact(this.state.size);
  }

  renderToolbar() {
    const { app, toolbar } = this.props;
    const { size, menuIsOpen, menuIsEnabled } = this.state;

    if (!toolbar) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();
    const shouldDisplayMenuToggle = isCompactLayout && menuIsEnabled;

    return React.cloneElement(toolbar, {
      app,
      layoutConfig: {
        size,
        isCompactLayout,
        toggleMenu: shouldDisplayMenuToggle && this.toggleMenu,
        menuIsOpen,
      },
    });
  }

  renderMenu() {
    const { app, menu, menuText } = this.props;
    const { size, menuIsOpen, menuIsPinned } = this.state;
    const isCompactLayout = this.isCompactLayout();

    let menuHeader;
    if (!isCompactLayout) {
      menuHeader = (
        <MenuHeader
          text={menuText}
          togglePin={!isCompactLayout && this.togglePin}
          isPinned={!isCompactLayout && menuIsPinned}
        />
      );
    }

    let menuContent;
    if (menu) {
      menuContent = React.cloneElement(menu, {
        app,
        layoutConfig: {
          size,
          isCompactLayout,
          toggleMenu: this.toggleMenu,
          menuIsOpen,
        },
      });
    }

    return (
      <ContentContainer
        fill
        header={menuHeader}
      >
        {menuContent}
      </ContentContainer>
    );
  }

  renderContent() {
    const { app, content } = this.props;
    const { size, menuIsOpen } = this.state;

    if (!content) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();

    return (
      <ContentContainer
        fill
        header={isCompactLayout && this.renderToolbar()}
      >
        {(
          React.cloneElement(content, {
            app,
            layoutConfig: {
              size,
              isCompactLayout,
              toggleMenu: this.toggleMenu,
              menuIsOpen,
            },
          })
        )}
      </ContentContainer>
    );
  }

  render() {
    const { menuText } = this.props;
    const { menuIsOpen, menuIsPinned, menuIsEnabled, size } = this.state;

    return (
      <ContentContainer
        fill
        header={!this.isCompactLayout() && this.renderToolbar()}
        {...getCustomProps(this.props, propTypes)}
      >
        <MenuSlidePanel
          isAnimated
          isOpen={menuIsOpen}
          onRequestClose={this.toggleMenu}
          panelBehavior={menuIsPinned ? 'squish' : 'overlay'}
          panelContent={this.renderMenu()}
          mainContent={this.renderContent()}
          size={size}
          toggleMenu={this.toggleMenu}
          isToggleEnabled={menuIsEnabled}
          menuText={menuText}
        />
      </ContentContainer>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
