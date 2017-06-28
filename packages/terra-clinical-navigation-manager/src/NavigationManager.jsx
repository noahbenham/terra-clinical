import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import ContentContainer from 'terra-content-container';
import NavigationToolbar from 'terra-navigation-toolbar';

import './NavigationManager.scss';


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
    this.state = { size: 'default', openIndex: -1, hasMenu: false };
    this.handleResize = this.handleResize.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleOpenParentMenu = this.handleOpenParentMenu.bind(this);
    this.handleUpdateHasMenu = this.handleUpdateHasMenu.bind(this);
    this.hasMenuArray = [];
    this.isOpenArray = [];
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
      this.isOpenArray.fill(false);
      this.setState({ size: size, openIndex: -1 });
    }
  }

  handleUpdateHasMenu(index, hasMenu) {
    if (this.hasMenuArray[index] !== hasMenu) {
      this.hasMenuArray[index] = hasMenu;
      this.isOpenArray[index] = false;

      const updatedHasMenu= this.hasMenuArray.indexOf(true) >= 0;
      if (this.state.hasMenu !== updatedHasMenu) {
        this.setState({ hasMenu: updatedHasMenu});
      }
    }
  }

  handleToggleMenu() {
    if (this.isOpenArray.indexOf(true) >= 0) {
      this.isOpenArray.fill(false);
      this.setState({ openIndex: -1 });
    } else {
      const hasMenuIndex = this.hasMenuArray.lastIndexOf(true);
      this.isOpenArray[hasMenuIndex] = true;
      this.setState({ openIndex: hasMenuIndex });
    }    
  }

  handleOpenParentMenu() {
    const openIndex = this.isOpenArray.indexOf(true);
    if (openIndex >= 0) {
      const hasMenuIndex = this.hasMenuArray.lastIndexOf(true, openIndex - 1);
      if (hasMenuIndex >= 0) {
        this.isOpenArray[openIndex] = false;
        this.isOpenArray[hasMenuIndex] = true;
        this.setState({ openIndex: hasMenuIndex });
      } else {
        this.setState({ openIndex: -1 });
      }
    }
  }

  buildNavigationToolbar(size, requests) {
    const { app, toolbar } = this.props;
    let toggle;
    if (this.state.hasMenu && size === 'tiny') {
      toggle = this.handleToggleMenu;
    }
    if (toolbar) {
      return React.cloneElement(toolbar, { app, size, onToggleClick: toggle });
    }
    return <NavigationToolbar app={app} size={size} onToggleClick={toggle} />;
  }

  buildChildren(size, requests) {
    const { app, children } = this.props;
    const newProps = { app, size, hasMenu: this.state.hasMenu, index: 0, openIndex: this.state.openIndex, ...requests };

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newProps);
    });
  }

  getBreakpointSize() {
    const width = window.innerWidth;
    const { tiny, small, medium, large, huge } = getBreakpoints();
    
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
    const { children, primary, ...customProps } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationManager',
      customProps.className,
    ]); 

    const requests = {
      requestToggleMenu: this.handleToggleMenu,
      requestOpenParentMenu: this.handleOpenParentMenu,
      requestUpdateHasMenu: this.handleUpdateHasMenu,
    };

    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    const toolbarContent = this.buildNavigationToolbar(size, requests);
    const childContent = this.buildChildren(size, requests);

    // add modal manager
    return (
      <ContentContainer {...customProps} className={navigationClassNames} header={toolbarContent} fill>
        {childContent}
      </ContentContainer>
    );
  }
}

NavigationManager.propTypes = propTypes;
NavigationManager.defaultProps = defaultProps;

export default NavigationManager;
