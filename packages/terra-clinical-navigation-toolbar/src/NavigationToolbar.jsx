import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import IconMenu from 'terra-icon/lib/icon/IconMenu';
import Button from 'terra-button';

import './NavigationToolbar.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  content: PropTypes.element,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  onToggleClick: PropTypes.func,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  logo: PropTypes.element,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  utility: PropTypes.element,
};

class NavigationToolbar extends React.Component {

  appendPropsToElement(element) {
    const { app, size } = this.props;
    return React.cloneElement(element, {app, size});
  }

  render() {
    const { 
      app,
      content,
      onToggleClick,
      logo,
      size,
      utility,
      ...customProps
    } = this.props;

    const toolbarClassNames = classNames([
      'terraClinical-NavigationToolbar',
      customProps.className,
    ]); 

    let logoElement;
    if (logo) {
      const clonedElement = this.appendPropsToElement(logo);
      logoElement = <div className="terraClinical-NavigationToolbar-start">{clonedElement}</div>;
    }

    let contentElement;
    if (content) {
      const clonedElement = this.appendPropsToElement(content);
      contentElement = <div className="terraClinical-NavigationToolbar-content">{clonedElement}</div>;
    }

    let utilityElement;
    if (utility) {
      const clonedElement = this.appendPropsToElement(utility);
      utilityElement = <div className="terraClinical-NavigationToolbar-end">{clonedElement}</div>;
    }

    let headerButton;
    if (onToggleClick) {
      headerButton = (
        <div className="terraClinical-NavigationToolbar-button">
          <Button variant="secondary" icon={<IconMenu />} onClick={onToggleClick} />
        </div>
      );
    }

    let headerBody;
    if (logoElement || contentElement || utilityElement) {
      headerBody = (
        <div className="terraClinical-NavigationToolbar-body">
          {logoElement}
          {contentElement}
          {utilityElement}
        </div>
      );
    }

    return (
      <div {...customProps} className={toolbarClassNames}>
        {headerButton}
        {headerBody}
      </div>
    );
  }
}

NavigationToolbar.propTypes = propTypes;

export default NavigationToolbar;
