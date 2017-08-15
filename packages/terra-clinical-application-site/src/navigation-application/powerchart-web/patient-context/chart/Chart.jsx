import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ChartReview from './review/ChartReview';

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
          <Route
            path="/patients/chart/review"
            render={props => (
              <ChartReview routingManager={this.props.routingManager} app={this.props.app} {...props} />
            )}
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
          {this.redirect && <Redirect to="/patients/chart/review" />}
        </Switch>
      </div>
    );
  }
}

export default Chart;
