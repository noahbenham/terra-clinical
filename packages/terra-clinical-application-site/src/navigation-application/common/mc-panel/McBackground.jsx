import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import McIcon from './McIcon';
import styles from './McBackground.scss';

const cx = classNames.bind(styles);

const propTypes = {
  children: PropTypes.node,
};

const McBackground = ({
  children,
  ...customProps
}) => {
  const backgroundClasses = cx([
    'mc-background',
    customProps.className,
  ]);

  return (
    <div {...customProps } className={backgroundClasses}>
      {children}
      <McIcon />
    </div>
  );
};

McBackground.propTypes = propTypes;

export default McBackground;
