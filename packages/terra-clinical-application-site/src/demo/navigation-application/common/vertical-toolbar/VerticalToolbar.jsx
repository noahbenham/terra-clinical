import React from 'react';

import 'terra-base/lib/baseStyles';
import './VerticalToolbar.scss';

const VerticalToolbar = (props) => {
  return (
    <div className="vertical-toolbar">
      {props.children}
    </div>
  );
};

export default VerticalToolbar;
