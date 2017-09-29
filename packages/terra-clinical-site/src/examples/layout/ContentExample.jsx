import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  app: PropTypes.any,
  layoutConfig: PropTypes.object,
  onToggleClick: PropTypes.func,
};

const content = ({
  app,
  layoutConfig,
  onToggleClick,
  ...customProps
}) => (
  <div {...customProps} style={{ height: '100%', width: '100%', backgroundColor: 'red' }} />
);
content.propTypes = propTypes;

export default content;
