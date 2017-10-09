import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  layoutConfig: PropTypes.object,
};

const content = ({
  layoutConfig,
}) => (
  <div style={{ height: '40px', width: '100%', backgroundColor: 'yellow' }}>
    {layoutConfig.toggleMenu && <button onClick={layoutConfig.toggleMenu}>Toggle</button>}
  </div>
);
content.propTypes = propTypes;

export default content;
