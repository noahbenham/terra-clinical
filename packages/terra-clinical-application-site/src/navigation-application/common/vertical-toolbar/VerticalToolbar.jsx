import React from 'react';

import 'terra-base/lib/baseStyles';
import './VerticalToolbar.scss';
const VerticalToolbar = (props) => (
    <div className="vertical-toolbar">
      <div style={{ borderBottom: '1px solid #fff', width: '40px' }}>
      </div>
      {props.children}
    </div>
  );

export default VerticalToolbar;
