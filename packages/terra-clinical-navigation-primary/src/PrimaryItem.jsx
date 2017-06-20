import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import Button from 'terra-button';
import List from 'terra-list';
import './PrimaryItem.scss';

const propTypes = {
  icon: PropTypes.element,
  isVerticalAlignment: PropTypes.bool,
  text: PropTypes.string,
};

const defaultProps = {
  isVerticalAlignment: false,
};

const PrimaryItem = ({
    icon,
    isVerticalAlignment,
    text,
    ...customProps
  }) => {
  const itemClassNames = classNames([
    'terraClinical-PrimaryItem',
    { 'terraClinical-PrimaryItem--vertical': isVerticalAlignment },
    customProps.className,
  ]);

  if (isVerticalAlignment) {
    return (
      <List.Item {...customProps} className={itemClassNames} content={<Button icon={icon} text={text} isBlock />} />
    );
  } else {
    return (
      <Button {...customProps} icon={icon} text={text} className={itemClassNames} />
    );
  }
};

PrimaryItem.propTypes = propTypes;
PrimaryItem.defaultProps = defaultProps;

export default PrimaryItem;
