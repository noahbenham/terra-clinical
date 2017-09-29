import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  app: PropTypes.any,
  layoutConfig: PropTypes.object,
  onToggleClick: PropTypes.func,
};

const menu = ({
  app,
  layoutConfig,
  onToggleClick,
  ...customProps
}) => (
  <div {...customProps} style={{ height: '100%', width: '100%', backgroundColor: 'blue' }}>
    {!!layoutConfig.togglePin && <button onClick={layoutConfig.togglePin}>Pin</button>}
  </div>
);
menu.propTypes = propTypes;

export default menu;
