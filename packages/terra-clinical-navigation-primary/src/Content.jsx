import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import './Content.scss';
import ContentSection from './ContentSection';

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

const Content = ({
    children,
    isVerticalAlignment,
    ...customProps
  }) => {
  const listClassNames = classNames([
    'terraClinical-NavigationContent',
    { 'terraClinical-NavigationContent--vertical': isVerticalAlignment },
    customProps.className,
  ]);

  return (
    <div {...customProps} className={listClassNames}>
      {children}
    </div>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;
Content.Section = ContentSection;

export default Content;
