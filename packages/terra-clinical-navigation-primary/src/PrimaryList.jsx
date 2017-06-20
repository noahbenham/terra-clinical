import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import './PrimaryList.scss';
import PrimaryItem from './PrimaryItem';
import List from 'terra-list';

const propTypes = {
  /**
   * The children list items passed to the component.
   */
  children: PropTypes.node,
  isVerticalAlignment: PropTypes.bool,
};

const defaultProps = {
  children: [],
  isVerticalAlignment: false,
};

const PrimaryList = ({
    children,
    isVerticalAlignment,
    ...customProps
  }) => {
  const listClassNames = classNames([
    'terraClinical-PrimaryList',
    { 'terraClinical-PrimaryList--vertical': isVerticalAlignment },
    customProps.className,
  ]);

  const clonedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isVerticalAlignment });
  }); 

  if (isVerticalAlignment) {
    return (
      <List {...customProps} className={listClassNames}>
        {clonedChildren}
      </List>
    );
  } else {
    return (
      <div {...customProps} className={listClassNames}>
        {clonedChildren}
      </div>
    );
  }
};

PrimaryList.propTypes = propTypes;
PrimaryList.defaultProps = defaultProps;
PrimaryList.Item = PrimaryItem;

export default PrimaryList;
