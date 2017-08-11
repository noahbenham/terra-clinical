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
              <h2>Messages</h2>
            )}
          />
          <Route
            path={`${match.path}alerts`}
            render={() => (
              <h2>Alerts</h2>
            )}
          />
          <Route
            path={`${match.path}patients`}
            render={() => (
              <h2>Patients</h2>
            )}
          />
          <Route
            render={() => (
              <h2>Root Page</h2>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Root;
