import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import ContentContainer from 'terra-content-container';
import './NavigationContainer.scss';


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
  header: PropTypes.element,
};

const defaultProps = {
  children: [],
};

class NavigationContainer extends React.Component {

  buildChildren(children, newChildProps) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newChildProps);
    });
  }

  buildHeader(header, app) {
    if (header) {
      return React.cloneElement(header, { app });
    }
  }

  render() {
    const {
      app,
      children,
      hasParentMenu,
      header,
      index,
      openIndex,
      requestOpenParentMenu,
      requestToggleMenu,
      requestUpdateHasMenu,
      size,
      ...customProps
    } = this.props;

    const newChildProps = {
      app,
      hasParentMenu,
      index,
      openIndex,
      requestOpenParentMenu,
      requestToggleMenu,
      requestUpdateHasMenu,
      size,
    };

    const navigationClassNames = classNames([
      'terraClinical-NavigationContainer',
      customProps.className,
    ]); 

    const childContent = this.buildChildren(children, newChildProps);
    return (
      <ContentContainer {...customProps} header={this.buildHeader(header, app)} fill>
        {childContent}
      </ContentContainer>
    );
  }
}

NavigationContainer.propTypes = propTypes;
NavigationContainer.defaultProps = defaultProps;

export default NavigationContainer;
