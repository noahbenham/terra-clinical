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
    const { match } = this.props;

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuschia' }}>
        <Switch>
          <Route
            path={`${match.path}messages`}
            render={() => (
              <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                    <h2>No Messages</h2>
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path={`${match.path}alerts`}
            render={() => (
              <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                    <h2>No Alerts</h2>
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path={`${match.path}patients`}
            render={() => (
              <div>
                <h2>Patients</h2>
                <p>This should never be rendered...</p>
              </div>
            )}
          />
          <Route
            render={() => (
              <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'lightgrey', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', color: 'grey', transform: 'translateX(-50%)' }}>
                    <h2>Chart App</h2>
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
