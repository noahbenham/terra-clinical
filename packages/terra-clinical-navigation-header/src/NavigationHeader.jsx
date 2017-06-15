import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import Logo from './_Logo';
import './NavigationHeader.scss';

const propTypes = {
  onToggleClick: PropTypes.func,
  applicationTitle: PropTypes.string,
  applicationIcon: PropTypes.element,
  itemSection: PropTypes.element,
  toolSection: PropTypes.element,
  junkSection: PropTypes.element,
  utilitySection: PropTypes.element,
};

const NavigationHeader = ({
    onToggleClick,
    applicationTitle,
    applicationIcon,
    itemSection,
    toolSection,
    junkSection,
    utilitySection,
    ...customProps
  }) => {
  const headerClassNames = classNames([
    'terraClinical-NavigationHeader',
    customProps.className,
  ]);

  let logoContent;
  if (applicationIcon || onToggleClick || applicationTitle) {
    const logo = <Logo icon={applicationIcon} onToggleClick={onToggleClick} title={applicationTitle} />;
    logoContent = <div className="terraClinical-NavigationHeader-logo">{logo}</div>;
  }

  let itemContent;
  if (itemSection) {
    itemContent = <div className="terraClinical-NavigationHeader-items">{itemSection}</div>;
  }

  let toolContent;
  if (toolSection) {
    toolContent = <div className="terraClinical-NavigationHeader-tools">{toolSection}</div>;
  }

  let junkContent;
  if (junkSection) {
    junkContent = <div className="terraClinical-NavigationHeader-junk">{junkSection}</div>;
  }

  let utilityContent;
  if (utilitySection) {
    utilityContent = <div className="terraClinical-NavigationHeader-utility">{utilitySection}</div>;
  }

  return (
    <div {...customProps} className={headerClassNames}>
      {logoContent}
      {itemContent}
      {toolContent}
      {junkContent}
      {utilityContent}
    </div>
  );
};

NavigationHeader.propTypes = propTypes;

export default NavigationHeader;
