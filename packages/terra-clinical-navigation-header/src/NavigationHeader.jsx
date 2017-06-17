import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';
import Arrange from 'terra-arrange'
import Button from 'terra-button';
import IconMenu from 'terra-icon/lib/icon/IconMenu';

import './NavigationHeader.scss';

const propTypes = {
  end: PropTypes.element,
  endContent: PropTypes.element,
  onButtonClick: PropTypes.func,
  start: PropTypes.element,
  startContent: PropTypes.element,
};

const NavigationHeader = ({
    end,
    endContent,
    onButtonClick,
    start,
    startContent,
    ...customProps
  }) => {
  const headerClassNames = classNames([
    'terraClinical-NavigationHeader',
    customProps.className,
  ]);

  let headerButton;
  if (onButtonClick) {
    headerButton = <div className="terraClinical-NavigationHeader-button"><Button icon={<IconMenu />} onClick={onButtonClick} /></div>;
  }

  let startElement;
  if (start) {
    startElement = <div className="terraClinical-NavigationHeader-start">{start}</div>;
  }

  let startContentELement;
  if (startContent) {
    startContentELement = <div className="terraClinical-NavigationHeader-startContent">{startContent}</div>;
  }

  let endElement;
  if (end) {
    endElement = <div className="terraClinical-NavigationHeader-end">{end}</div>;
  }

  let endContentElement;
  if (endContent) {
    endContentElement = <div className="terraClinical-NavigationHeader-endContent">{endContent}</div>;
  }

  let headerBody;
  if (startElement || startContentELement || endElement || endContentElement) {
    headerBody = (
      <div className="terraClinical-NavigationHeader-body">
        {startElement}
        {startContent}
        {endContentElement}
        {endElement}
      </div>
    );
  }

  return (
    <div {...customProps} className={headerClassNames}>
      {headerButton}
      {headerBody}
    </div>
  );
};

NavigationHeader.propTypes = propTypes;

export default NavigationHeader;
