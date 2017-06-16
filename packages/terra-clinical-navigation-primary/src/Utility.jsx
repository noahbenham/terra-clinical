import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import IconMenu from 'terra-icon/lib/icon/IconMenu';
import './Utility.scss';

const propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
};

const Utility = ({
    icon,
    title,
    ...customProps
  }) => {

  const utilityClassNames = classNames([
    'terraClinical-NavigationUtility',
    customProps.className,
  ]);

  let iconElement;
  if (icon) {
    iconElement = (
      <div className="terraClinical-NavigationUtility-icon">
        {icon}
      </div>
    );
  }

  let titleElement;
  if (title) {
    titleElement = (
      <div className="terraClinical-NavigationUtility-text">
        {title}
      </div>
    );
  }

  // should this use the new profile image control?
  return (
    <div {...customProps} className={utilityClassNames}>
      {titleElement}
      {iconElement}
    </div>
  );
};

Utility.propTypes = propTypes;

export default Utility;
