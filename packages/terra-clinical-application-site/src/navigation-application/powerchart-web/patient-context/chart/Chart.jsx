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
    const ReviewComponent = ({ location }) => (
      <div>
        <h2>Review</h2>
        <hr />
        {location.state && location.state.selectedSection && <p>Selected Section: {location.state.selectedSection}</p>}
      </div>
    );

    return (
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundColor: 'fuschia' }}>
        <Switch>
          <Route
            path="/patients/chart/review"
            component={ReviewComponent}
          />
          <Route
            path="/patients/chart/orders"
            render={() => (
              <div>Orders</div>
            )}
          />
          <Route
            path="/patients/chart/documents"
            render={() => (
              <div>Documents</div>
            )}
          />
          <Route
            component={ReviewComponent}
          />
        </Switch>
      </div>
    );
  }
}

export default Chart;
