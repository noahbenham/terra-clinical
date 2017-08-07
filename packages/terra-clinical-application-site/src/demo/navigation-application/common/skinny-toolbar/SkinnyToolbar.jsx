import React from 'react';

const SkinnyToolbar = (props) => {
  return (
    <div style={{ height: '30px', borderBottom: '1px solid lightgrey'}}>
      {props.buttons}
    </div>
  )
}

export default SkinnyToolbar;
