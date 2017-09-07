import React from 'react';
import MenuToolbar from '../common/menu-toolbar/MenuToolbar';

class UserPrefs extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={{ height: '100%', backgroundColor: 'lightyellow', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'black', transform: 'translateX(-50%)' }}>
            <h2>User Prefs Go Here</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPrefs;
