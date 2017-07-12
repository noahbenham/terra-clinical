import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import ContentContainer from 'terra-content-container';
import SlideGroup from 'terra-slide-group';
import SlidePanel from 'terra-slide-panel';

import './NavigationManager.scss';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will be displayed within the content body of secondary navigation
   **/
  children: PropTypes.node,
  /**
   * Component that will managed primary navigation actions.
   **/
  toolbar: PropTypes.element,
};

const defaultProps = {
  children: [],
};

class NavigationManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: 'default', openIndex: -1, hasMenu: false, isOpen: false };
    // this.handleDiscloseContent = this.handleDiscloseContent.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleOpenHomeMenu = this.handleOpenHomeMenu.bind(this);
    this.handleOpenParentMenu = this.handleOpenParentMenu.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleRegisterNavigation = this.handleRegisterNavigation.bind(this);
    this.handleDeregisterNavigation = this.handleDeregisterNavigation.bind(this);
    this.menuStack = [];
    this.menuRoutes = {};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const size = this.getBreakpointSize();
    if (size !== this.state.size) {
      const newState = { size: size, isOpen: false };
      const newHasMenu = this.hasMenu();
      if (this.state.hasMenu !== newHasMenu) {
        newState.hasMenu = newHasMenu;
      }
      this.setState(newState);
    }
  }

  handleRegisterNavigation(index, menuData) {
    this.menuStack[index] = menuData;

    const newHasMenu = this.hasMenu();
    if (this.state.hasMenu !== newHasMenu) {
      this.setState({ hasMenu: newHasMenu });
    }
  }

  handleDeregisterNavigation(index) {
    if (this.menuStack[index]) {
      this.menuStack.splice(index);

      let newState;
      const newHasMenu = this.hasMenu();
      if (this.state.hasMenu !== newHasMenu) {
        newState = { hasMenu: newHasMenu };
      }
      if (this.state.openIndex >= index) {
        (newState || {}).openIndex = -1;
        newState.isOpen = false;
      }
      if (newState) {
        this.setState(newState);
      }
    }
  }

  handleToggleMenu() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true, openIndex: this.lastValidIndex(this.menuStack.length) });
    }
  }

  handleOpenHomeMenu() {
    this.traverseMenuStack(this.state.openIndex, this.firstValidIndex(0));
  }

  handleOpenParentMenu() {
    this.traverseMenuStack(this.state.openIndex, this.lastValidIndex(this.state.openIndex - 1));
  }

  traverseMenuStack(previousIndex, nextIndex) {
    if (nextIndex >= 0 && previousIndex !== nextIndex) {
      this.setState({ openIndex: nextIndex });
    } else {
      this.setState({ isOpen: false, openIndex: -1 });
    }
  }

  firstValidIndex(index) {
    for (let i = index; i < this.menuStack.length; i += 1) {
      if (this.shouldDisplayMenu(this.menuStack[i])) {
        return i;
      }
    }
    return -1;
  }

  lastValidIndex(index) {
    for (let i = index; i >= 0; i -= 1) {
      if (this.shouldDisplayMenu(this.menuStack[i])) {
        return i;
      }
    }
    return -1;
  }

  hasMenu() {
    return this.firstValidIndex(0) >= 0;
  }

  shouldDisplayMenu(menu) {
    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    return menu && BREAKPOINTS.indexOf(size) <= BREAKPOINTS.indexOf(menu.breakpoint);
  }

  buildToolbar(app, size, toolbar) {
    let toggle;
    if (this.state.hasMenu) {
      toggle = this.handleToggleMenu;
    }
    if (toolbar) {
      return React.cloneElement(toolbar, { app, size, onToggleClick: toggle });
    }
    return <NavigationToolbar app={app} size={size} onToggleClick={toggle} />;
  }

  buildChildren(app, size, children) {
    const newChildProps = {
      app,
      deregisterNavigation: this.handleDeregisterNavigation,
      index: 0,
      registerNavigation: this.handleRegisterNavigation,
      requestToggleMenu: this.handleToggleMenu,
      size,
    };

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newChildProps);
    });
  }

  buildMenu(app, size) {
    const basicProps = {
      app,
      requestToggleMenu: this.handleToggleMenu,
      size,
    };

    const additionalProps = {
      requestOpenHomeMenu: this.handleOpenHomeMenu,
      requestOpenParentMenu: this.handleOpenParentMenu,
    };

    const validMenus = this.menuStack.filter( (menu, index) => {
      return this.shouldDisplayMenu(menu) && this.state.openIndex >= index;
    });

    const slideItems = validMenus.map( (menu, index) => {
      const ComponentClass = menu.class;
      if (index > 0) {
        return <ComponentClass {...menu.props} {...basicProps} {...additionalProps} key={`NavigationSlide ${index}`} />;
      }
      return <ComponentClass {...menu.props} {...basicProps} key={`NavigationSlide ${index}`} />;
    });

    if (!this.state.isOpen && slideItems.length) {
      return slideItems[slideItems.length - 1];
    }

    return <SlideGroup items={slideItems} isAnimated />;
  }

  getBreakpointSize() {
    const width = window.innerWidth;
    const { small, medium, large, huge } = getBreakpoints();

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

  render() {
    const {
      app,
      children,
      toolbar,
      ...customProps } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationManager',
      customProps.className,
    ]);

    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    const toolbarContent = this.buildToolbar(app, size, toolbar);
    const childContent = this.buildChildren(app, size, children);
    const menuContent = this.buildMenu(app, size);
    return (
      <ContentContainer {...customProps} className={navigationClassNames} header={toolbarContent} fill>
        <SlidePanel
          mainContent={childContent}
          panelContent={menuContent}
          panelSize="small"
          panelBehavior="squish"
          panelPosition="start"
          isOpen={this.state.isOpen}
          fill
        />
      </ContentContainer>
    );
  }
}

NavigationManager.propTypes = propTypes;
NavigationManager.defaultProps = defaultProps;

export default NavigationManager;
