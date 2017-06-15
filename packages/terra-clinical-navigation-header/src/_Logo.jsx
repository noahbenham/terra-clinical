import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import Button from 'terra-button';
import IconMenu from 'terra-icon/lib/icon/IconMenu';
import './Logo.scss';

const propTypes = {
  icon: PropTypes.element,
  onButtonClick: PropTypes.func,
  title: PropTypes.string,
};

const Logo = ({
    icon,
    onButtonClick,
    title,
    ...customProps
  }) => {

  const logoClassNames = classNames([
    'terraClinical-NavigationLogo',
    customProps.className,
  ]);

  let buttonElement;
  if (onButtonClick) {
    buttonElement = (
      <div className="terraClinical-NavigationLogo-element">
        <Button icon={<IconMenu />} onClick={onButtonClick} />
      </div>
    );
  }

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

  return (
    <div {...customProps} className={logoClassNames}>
      {buttonElement}
      {iconElement}
      {titleElement}
    </div>
  );
};

Logo.propTypes = propTypes;

export default Logo;
