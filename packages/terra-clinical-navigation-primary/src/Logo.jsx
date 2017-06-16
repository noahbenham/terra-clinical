import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import IconMenu from 'terra-icon/lib/icon/IconMenu';
import './Logo.scss';

const propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
};

const Logo = ({
    icon,
    title,
    ...customProps
  }) => {

  const logoClassNames = classNames([
    'terraClinical-NavigationLogo',
    customProps.className,
  ]);

  let iconElement;
  if (icon) {
    iconElement = (
      <div className="terraClinical-NavigationLogo-element">
        {icon}
      </div>
    );
  }

  let titleElement;
  if (title) {
    titleElement = (
      <div className="terraClinical-NavigationLogo-text">
        {title}
      </div>
    );
  }

  // should this take images? icons? a content section?
  return (
    <div {...customProps} className={logoClassNames}>
      {iconElement}
      {titleElement}
    </div>
  );
};

Logo.propTypes = propTypes;

export default Logo;
