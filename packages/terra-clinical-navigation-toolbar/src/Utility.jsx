import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import './Utility.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  accessory: PropTypes.element,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  title: PropTypes.string,
};

const Utility = ({
    app,
    accessory,
    size,
    title,
    ...customProps
  }) => {

  const utilityClassNames = classNames([
    'terraClinical-NavigationUtility',
    customProps.className,
  ]);

  let accessoryElement;
  if (accessory) {
    accessoryElement = (
      <div className="terraClinical-NavigationUtility-accessory">
        {accessory}
      </div>
    );
  }

  let titleElement;
  if (title && size !== 'tiny') {
    titleElement = (
      <div className="terraClinical-NavigationUtility-title">
        {title}
      </div>
    );
  }

  return (
    <div {...customProps} className={utilityClassNames}>
      {titleElement}
      {accessoryElement}
    </div>
  );
};

Utility.propTypes = propTypes;

export default Utility;
