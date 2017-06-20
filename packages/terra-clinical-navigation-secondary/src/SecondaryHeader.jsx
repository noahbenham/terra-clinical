import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import Button from 'terra-button';
import IconReply from 'terra-icon/lib/icon/IconReply';

import './SecondaryHeader.scss';

const propTypes = {
  onButtonClick: PropTypes.func,
};

const NavigationHeader = ({
    onButtonClick,
    ...customProps
  }) => {
  const headerClassNames = classNames([
    'terraClinical-SecondaryHeader',
    customProps.className,
  ]);

  let headerButton;
  if (onButtonClick) {
    headerButton = <div className="terraClinical-SecondaryHeader-button"><Button variant="secondary" icon={<IconReply />} onClick={onButtonClick} /></div>;
  }

  return (
    <div {...customProps} className={headerClassNames}>
      {headerButton}
    </div>
  );
};

NavigationHeader.propTypes = propTypes;

export default NavigationHeader;
