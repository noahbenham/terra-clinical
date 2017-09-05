import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import IconMenu from 'terra-icon/lib/icon/IconMenu';
import Button from 'terra-button';
import Utility from './Utility';
import Logo from './Logo';

import './ApplicationToolbar.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  app: AppDelegate.propType,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   * */
  content: PropTypes.element,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   * */
  onToggleClick: PropTypes.func,
  menuIsOpen: PropTypes.bool,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   * */
  logo: PropTypes.element,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   * */
  utility: PropTypes.element,
  size: PropTypes.string,
};

class ApplicationToolbar extends React.Component {

  appendPropsToElement(element) {
    const { app, size } = this.props;
    return React.cloneElement(element, { app, size });
  }

  render() {
    const {
      app,
      content,
      onToggleClick,
      menuIsOpen,
      logo,
      size,
      utility,
      ...customProps
    } = this.props;

    const isCompact = size === 'tiny' || size === 'small';

    const toolbarClassNames = classNames([
      'terraClinical-ApplicationToolbar',
      { 'terraClinical-ApplicationToolbar--compact': isCompact },
      customProps.className,
    ]);

    let logoElement;
    if (logo) {
      const clonedElement = this.appendPropsToElement(logo);
      logoElement = <div className="terraClinical-ApplicationToolbar-start">{clonedElement}</div>;
    }

    let contentElement;
    if (content) {
      const clonedElement = this.appendPropsToElement(content);
      contentElement = <div className="terraClinical-ApplicationToolbar-content">{clonedElement}</div>;
    }

    let utilityElement;
    if (utility) {
      const clonedElement = this.appendPropsToElement(utility);
      utilityElement = <div className="terraClinical-ApplicationToolbar-end">{clonedElement}</div>;
    }

    let headerButton;
    if (onToggleClick && (size === 'tiny' || size === 'small')) {
      const toggleButtonStyles = { color: 'white' };
      headerButton = (
        <div className="terraClinical-ApplicationToolbar-button">
          <Button variant="link" icon={<IconMenu />} onClick={onToggleClick} style={toggleButtonStyles} />
        </div>
      );
    }

    let headerBody;
    if (logoElement || contentElement || utilityElement) {
      headerBody = (
        <div className="terraClinical-ApplicationToolbar-body">
          {logoElement}
          {contentElement}
          {utilityElement}
        </div>
      );
    }

    return (
      <div>
        {!isCompact && <div style={{ height: '10px', backgroundColor: 'rgb(36, 129, 202)' }} />}
        <div {...customProps} className={toolbarClassNames}>
          {headerButton}
          {headerBody}
        </div>
      </div>
    );
  }
}

ApplicationToolbar.propTypes = propTypes;
ApplicationToolbar.Utility = Utility;
ApplicationToolbar.Logo = Logo;

export default ApplicationToolbar;
