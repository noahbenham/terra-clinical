import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import Button from 'terra-button';
import IconMenu from 'terra-icon/lib/icon/IconMenu';
import './Logo.scss';

const propTypes = {
  icon: PropTypes.element,
  onToggleClick: PropTypes.func,
  title: PropTypes.string,
};

const Logo = ({
    icon,
    onToggleClick,
    title,
    ...customProps
  }) => {

  const logoClassNames = classNames([
    'terraClinical-NavigationHeader-logo',
    customProps.className,
  ]);

  let button;
  if (onToggleClick) {
    button = <Button icon={<IconMenu />} onClick={onToggleClick} />;
  }

  return (
    <div {...customProps} className={logoClassNames}>
      {button}
      {icon}
      {title}
    </div>
  );
};

Logo.propTypes = propTypes;

export default Logo;
