import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import Button from 'terra-button';
import './NavigationHeader.scss';

const propTypes = {
  /**
   * The title of the no data view.
   */
  onButtonClick: PropTypes.func,
};

const defaultProps = {
  onButtonClick: undefined,
};

const NavigationHeader = ({
    onButtonClick,
    ...customProps
  }) => {
  const headerClassNames = classNames([
    'terraClinical-NavigationHeader',
    customProps.className,
  ]);


  return (
    <div {...customProps} className={headerClassNames}>
      <Button onClick={onButtonClick} />
    </div>
  );
};

NavigationHeader.propTypes = propTypes;
NavigationHeader.defaultProps = defaultProps;

export default NavigationHeader;
