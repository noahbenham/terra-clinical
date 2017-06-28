import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import './Logo.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  accesory: PropTypes.element,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  title: PropTypes.string,
};

const Logo = ({
    accessory,
    title,
    ...customProps
  }) => {

  const logoClassNames = classNames([
    'terraClinical-NavigationLogo',
    customProps.className,
  ]);

  let accessoryElement;
  if (accessory) {
    accessoryElement = (
      <div className="terraClinical-NavigationLogo-accessory">
        {accessory}
      </div>
    );
  }

  let titleElement;
  if (title) {
    titleElement = (
      <div className="terraClinical-NavigationLogo-title">
        {title}
      </div>
    );
  }

  return (
    <div {...customProps} className={logoClassNames}>
      {accessoryElement}
      {titleElement}
    </div>
  );
};

Logo.propTypes = propTypes;

export default Logo;
