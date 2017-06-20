import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';

import './Navigation.scss';


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
  primary: PropTypes.element.isRequired,
};

const defaultProps = {
  children: [],
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: 'default', openIndex: -1, hasContent: false };
    this.handleResize = this.handleResize.bind(this);
    this.handleToggleNavigation = this.handleToggleNavigation.bind(this);
    this.handleUpNavigation = this.handleUpNavigation.bind(this);
    this.handleHasContent = this.handleHasContent.bind(this);
    this.hasContentArray = [];
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

  handleHasContent(index, hasContent) {
    if (this.hasContentArray[index] !== hasContent) {
      this.hasContentArray[index] = hasContent;
      this.isOpenArray[index] = false;

      const updatedHasContent = this.hasContentArray.indexOf(true) >= 0;
      if (this.state.hasContent !== updatedHasContent) {
        this.setState({ hasContent: updatedHasContent });
      }
    }
  }

  handleToggleNavigation() {
    if (this.isOpenArray.indexOf(true) >= 0) {
      this.isOpenArray.fill(false);
      this.setState({ openIndex: -1 });
    } else {
      const hasContentIndex = this.hasContentArray.lastIndexOf(true);
      this.isOpenArray[hasContentIndex] = true;
      this.setState({ openIndex: hasContentIndex });
    }    
  }

  handleUpNavigation() {
    const openIndex = this.isOpenArray.indexOf(true);
    if (openIndex >= 0) {
      const hasContentIndex = this.hasContentArray.lastIndexOf(true, openIndex - 1);
      if (hasContentIndex >= 0) {
        this.isOpenArray[openIndex] = false;
        this.isOpenArray[hasContentIndex] = true;
        this.setState({ openIndex: hasContentIndex });
      } else {
        this.setState({ openIndex: -1 });
      }
    }
  }

  buildPrimaryContent(size, requests) {
    const { app, primary } = this.props;
    return React.cloneElement(primary, { app, size, hasContent: this.state.hasContent, index: 0, openIndex: this.state.openIndex, ...requests });
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
      'terraClinical-Navigation',
      customProps.className,
    ]); 

    const requests = {
      requestToggleNavigation: this.handleToggleNavigation,
      requestUpNavigation: this.handleUpNavigation,
      requestUpdateHasContent: this.handleHasContent,
    };

    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    const primaryContent = this.buildPrimaryContent(size, requests);

    return (
      <div {...customProps} className={navigationClassNames}>
        {primaryContent}
      </div>
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
