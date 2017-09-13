import React from 'react';

const SkinnyToolbar = (props) => {
  return (
    <div style={{ height: '30px', backgroundColor: '#a3c5e6', borderBottom: '1px solid rgba(2, 2, 138,0.4)', borderTop: '1px solid rgba(2, 2, 138,0.4)'}}>
      {props.buttons}
    </div>
  )
}

export default SkinnyToolbar;
