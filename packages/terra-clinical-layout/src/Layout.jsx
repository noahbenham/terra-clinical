import React from 'react';
import PropTypes from 'prop-types';
import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';

import LayoutSlidePanel from './_LayoutSlidePanel';
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
   * Whether or not menu toggling is enabled. If not enabled, menu content will not be visible, and toggle
   * functionality will be hidden.
   */
  enableMenu: PropTypes.bool,
};

const defaultProps = {
  enableMenu: false,
};

const compactSizes = ['tiny', 'small'];
const isSizeCompact = size => (
  compactSizes.indexOf(size) >= 0
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
    if (nextProps.enableMenu !== this.props.enableMenu) {
      this.setState({
        menuIsEnabled: nextProps.enableMenu,
        menuIsOpen: nextProps.enableMenu && this.state.menuIsOpen,
        menuIsPinned: nextProps.enableMenu && this.state.menuIsPinned,
      });
    }
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
    const { app, menu } = this.props;
    const { size, menuIsOpen, menuIsPinned } = this.state;

    if (!menu) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();
    const vessel = React.cloneElement(menu, {
      app,
      layoutConfig: {
        size,
        isCompactLayout,
        toggleMenu: this.toggleMenu,
        menuIsOpen,
      },
    });

    return (
      <ContentContainer
        fill
        header={!isCompactLayout ? (
          <MenuHeader
            text="Menu"
            togglePin={!isCompactLayout ? this.togglePin : undefined}
            isPinned={!isCompactLayout ? menuIsPinned : undefined}
          />
        ) : undefined}
      >
        {vessel}
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
    const { menuIsOpen, menuIsPinned, menuIsEnabled, size } = this.state;

    return (
      <ContentContainer
        fill
        header={!this.isCompactLayout() && this.renderToolbar()}
        {...getCustomProps(this.props, propTypes)}
      >
        <LayoutSlidePanel
          isAnimated
          isOpen={menuIsOpen}
          onRequestClose={this.toggleMenu}
          panelBehavior={menuIsPinned ? 'squish' : 'overlay'}
          panelContent={this.renderMenu()}
          mainContent={this.renderContent()}
          size={size}
          toggleMenu={this.toggleMenu}
          isToggleEnabled={menuIsEnabled}
        />
      </ContentContainer>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
export { getBreakpointSize, getCustomProps };
