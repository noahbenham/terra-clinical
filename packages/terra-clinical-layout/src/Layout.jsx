import React from 'react';
import PropTypes from 'prop-types';
import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';
import breakpoints from 'terra-responsive-element/lib/breakpoints.scss';

import LayoutSlidePanel from './_LayoutSlidePanel';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  app: AppDelegate.propType,
  /**
   * Element to be placed within the main content section of the layout.
   * */
  content: PropTypes.element,
  /**
   * Whether or not the menu with accompaning hover/toggle should be displayed.
   * */
  isMenuEnabled: PropTypes.bool,
  /**
   * Element to be placed within the menu section of the layout.
   * */
  menu: PropTypes.element,
  /**
   * ELement to be placed within the toolbar section of the layout.
   * */
  toolbar: PropTypes.element,
};

const defaultProps = {
  isMenuEnabled: false,
};

class Layout extends React.Component {
  static getBreakpointSize() {
    const width = window.innerWidth;
    const { small, medium, large, huge } = breakpoints;

    if (width >= huge) {
      return 'huge';
    } else if (width >= large) {
      return 'large';
    } else if (width >= medium) {
      return 'medium';
    } else if (width >= small) {
      return 'small';
    }
    return 'tiny';
  }

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePin = this.togglePin.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.isCompactLayout = this.isCompactLayout.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderContent = this.renderContent.bind(this);

    const initialSize = Layout.getBreakpointSize();

    this.state = {
      menuIsOpen: false,
      menuIsPinned: false,
      toggleIsAvailable: props.isMenuEnabled,
      size: initialSize,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isMenuEnabled !== this.props.isMenuEnabled) {
      this.setState({
        toggleIsAvailable: nextProps.isMenuEnabled,
        menuIsOpen: nextProps.isMenuEnabled && this.state.menuIsOpen,
        menuIsPinned: nextProps.isMenuEnabled && this.state.menuIsPinned,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize() {
    const newSize = Layout.getBreakpointSize();

    if (this.state.size !== newSize) {
      const newMenuIsPinned = this.props.isMenuEnabled && (newSize !== 'tiny' && newSize !== 'small') && this.state.menuIsPinned;
      const newMenuIsOpen = this.props.isMenuEnabled && this.state.menuIsOpen && newMenuIsPinned;

      this.setState({
        size: newSize,
        toggleIsAvailable: this.props.isMenuEnabled,
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
    return this.state.size === 'tiny' || this.state.size === 'small';
  }

  renderToolbar() {
    const { app, toolbar } = this.props;
    const { size, menuIsOpen } = this.state;

    if (!toolbar) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();
    const shouldDisplayMenuToggle = isCompactLayout || this.state.toggleIsAvailable;

    return React.cloneElement(toolbar, {
      app,
      layoutConfig: {
        size,
        isCompactLayout,
        toggleMenu: shouldDisplayMenuToggle && this.toggleMenu,
        menuIsOpen,
      },
      onToggleClick: shouldDisplayMenuToggle ? this.toggleMenu : undefined,
    });
  }

  renderMenu() {
    const { app, menu } = this.props;
    const { size, menuIsOpen, menuIsPinned } = this.state;

    if (!menu) {
      return null;
    }

    const isCompactLayout = this.isCompactLayout();

    return React.cloneElement(menu, {
      app,
      layoutConfig: {
        size,
        isCompactLayout,
        toggleMenu: this.toggleMenu,
        menuIsOpen,
        togglePin: !isCompactLayout ? this.togglePin : undefined,
        menuIsPinned: !isCompactLayout ? menuIsPinned : undefined,
      },
    });
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
    const { menuIsOpen, menuIsPinned, size } = this.state;
    const { app, content, isMenuEnabled, menu, toolbar, ...customProps } = this.props;

    return (
      <ContentContainer
        fill
        header={!this.isCompactLayout() && this.renderToolbar()}
        {...customProps}
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
          isToggleEnabled={this.state.toggleIsAvailable || this.isCompactLayout()}
        />
      </ContentContainer>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
