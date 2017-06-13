import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';

import './BaseSecondary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the NavigationSecondary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
  isOpen: false,
  isTiny: false,
};

class BaseSecondary extends React.Component {

  buildChildren() {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app });
    });
  }

  render() {
    const { 
      app,
      children,
      isTiny,
      isOpen,
      requestPrimaryOpen,
      requestPrimaryClose,
      requestSecondaryOpen,
      requestSecondaryClose,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-BaseSecondary',
      customProps.className,
    ]);

    const clonedChildren = this.buildChildren();
    let content = clonedChildren;
    if (isTiny) {
      // handle header when in small format
      const header = <div onClick={requestPrimaryOpen} style={{height: '40px', width: '100%', backgroundColor: '#10c022'}}>I'm Mr. Top Secondary</div>;
      content = (
        <ContentContainer fill header={header}>
          {clonedChildren}
        </ContentContainer>
      );
    }

    return (
      <div {...customProps} className={navigationClassNames}>
        {content}
      </div>
    );
  }
}

BaseSecondary.propTypes = propTypes;
BaseSecondary.defaultProps = defaultProps;

export default BaseSecondary;
