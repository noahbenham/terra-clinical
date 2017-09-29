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
  <div {...customProps} style={{ height: '40px', width: '100%', backgroundColor: 'yellow' }}>
    {(layoutConfig.size === 'tiny' || layoutConfig.size === 'small') && <button onClick={onToggleClick}>Toggle</button>}
  </div>
);
content.propTypes = propTypes;

export default content;
