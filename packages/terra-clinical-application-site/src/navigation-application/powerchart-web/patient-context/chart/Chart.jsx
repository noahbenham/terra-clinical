import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import MenuToolbar from '../../../common/menu-toolbar/MenuToolbar';

class Chart extends React.Component {
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
          <Route path="/patients/chart/review" render={({ location }) => {
            return (
              <div>
                <h2>Chart</h2>
                <hr />
                {location.state && location.state.selectedSection && <p>Selected Section: {location.state.selectedSection}</p>}
              </div>
            );
          }} />
          <Route path="/patients/chart/orders" render={() => {
            return <div>Orders</div>
          }} />
          <Route path="/patients/chart/documents" render={() => {
            return <div>Documents</div>
          }} />
          {this.redirect && <Redirect to="/patients/chart/review" />}
        </Switch>
      </div>
    )
  }
}

export default Chart;
