import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import './ContentSection.scss';

const propTypes = {
  /**
   * The content element to be placed inside the list item for display.
   */
  children: PropTypes.element,
};

const defaultProps = {
  children: [],
};

const ContentSection = ({
    children,
    ...customProps
  }) => {
  const contentSectionClassNames = classNames([
    'terraClinical-NavigationContent-section',
    customProps.className,
  ]);

  return (
    <div {...customProps} className={contentSectionClassNames}>
      {children}
    </div>
  );
};

ContentSection.propTypes = propTypes;
ContentSection.defaultProps = defaultProps;

export default ContentSection;
