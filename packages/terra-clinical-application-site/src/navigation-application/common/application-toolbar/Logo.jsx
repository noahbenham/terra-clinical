import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import './Logo.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  accesory: PropTypes.element,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  title: PropTypes.string,
};

const Logo = ({
    accessory,
    app,
    size,
    title,
    ...customProps
  }) => {
  const logoClassNames = classNames([
    'terraClinical-NavigationLogo',
    { 'terraClinical-NavigationLogo--compact': size === 'tiny' || size === 'small' },
    customProps.className,
  ]);

  return (
    <div {...customProps} className={logoClassNames}>
      {!!accessory && <div className="terraClinical-NavigationLogo-accessory">{accessory}</div>}
      {!!title && size !== 'tiny' && <div className="terraClinical-NavigationLogo-title"><h3>{title}</h3></div>}
    </div>
  );
};

Logo.propTypes = propTypes;

export default Logo;
