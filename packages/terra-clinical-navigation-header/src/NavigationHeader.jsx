import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import Arrange from 'terra-arrange'
import Button from 'terra-button';
import IconMenu from 'terra-icon/lib/icon/IconMenu';

import './NavigationHeader.scss';

const propTypes = {
  content: PropTypes.element,
  logo: PropTypes.element,
  onButtonClick: PropTypes.func,
  utility: PropTypes.element,
};

const NavigationHeader = ({
    content,
    logo,
    onButtonClick,
    utility,
    ...customProps
  }) => {
  const headerClassNames = classNames([
    'terraClinical-NavigationHeader',
    customProps.className,
  ]);

  let headerButton = <div />;
  if (onButtonClick) {
    headerButton = <Button icon={<IconMenu />} onClick={onButtonClick} />;
  }

  let requiredStart = <div />;
  if (logo) {
    requiredStart = logo;
  }

  let requiredContent = <div />;
  if (content) {
    requiredContent = content;
  }

  let requiredEnd = <div />;
  if (utility) {
    requiredEnd = utility;
  }

  const headerBody = (
    <Arrange
      fitStart={requiredStart}
      fill={requiredContent}
      fitEnd={requiredEnd}
      align="center"
    />
  );

  return (
    <Arrange
      {...customProps}
      className={headerClassNames}
      fitStart={headerButton}
      fill={headerBody}
      align="center"
    />
  );
};

NavigationHeader.propTypes = propTypes;

export default NavigationHeader;
