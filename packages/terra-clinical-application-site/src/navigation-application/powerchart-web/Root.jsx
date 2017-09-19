import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import MenuToolbar from '../common/menu-toolbar/MenuToolbar';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.redirect = true;
  }

  componentDidMount() {
    this.redirect = false;
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuschia' }}>
        <Switch>
          <Route
            path={'/messages'}
            render={() => (
              <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'plum', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'black', transform: 'translateX(-50%)' }}>
                    <h2>No Messages</h2>
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path={'/alerts'}
            render={() => (
              <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'lightblue', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'black', transform: 'translateX(-50%)' }}>
                    <h2>No Alerts</h2>
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path={'/metrics'}
            render={() => (
              <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'lightblue', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'black', transform: 'translateX(-50%)' }}>
                    <h2>No Metrics</h2>
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Root;
