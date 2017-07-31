import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { connect } from 'react-redux';
import AppDelegate from 'terra-app-delegate';
import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';

import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const propTypes = {
  app: AppDelegate.propType,
};

const Home = () => (
  <div>HOME</div>
);

const HomeNav = () => (
  <div style={{ height: '100%', backgroundColor: 'green'}}>
    <ul>
      <li><Link to="/allergies">Allergies</Link></li>
      <li><Link to="/orders">Orders</Link></li>
    </ul>
  </div>
)

const Allergies = ({ match, location }) => (
  <div>
    <h2>Allergies</h2>
    <Route path="/allergies/stuff" component={AllergiesStuff}/>
  </div>
);

const AllergiesNav = ({ match, location }) => {
  console.log('AllergiesNav');
  console.log(match);
  console.log(location);

  return (
    <div style={{ height: '100%', backgroundColor: 'red'}}>
      <ul>
        <li><Link to={match.url.substring(0, match.url.lastIndexOf('/allergies'))}>Back</Link></li>
        <li><Link to="/allergies/stuff">Stuff</Link></li>
      </ul>
      <Route path="/allergies/stuff" component={AllergiesStuffNav} />
    </div>
  );
};

const AllergiesStuff = () => (
  <div>
    <h2>Stuff</h2>
  </div>
);

const AllergiesStuffNav = ({ match, location }) => {
  console.log('AllergiesStuffNav');
  console.log(match);
  console.log(location);

  return (
    <div style={{ height: '100%', backgroundColor: 'orange'}}>
      <ul>
        <li><Link to={match.url.substring(0, match.url.lastIndexOf('/stuff'))}>Back</Link></li>
      </ul>
    </div>
  );
};

const Orders = () => (
  <div>Orders</div>
);

const OrdersNav = ({ match }) => (
  <div style={{ height: '100%', backgroundColor: 'yellow'}}>
    <ul>
      <li><Link to={match.url.substring(0, match.url.lastIndexOf('/orders'))}>Back</Link></li>
    </ul>
  </div>
)

const RootNav = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeNav}/>
        <Route path="/allergies" component={AllergiesNav}/>
        <Route path="/orders" component={OrdersNav}/>
      </Switch>
    </div>
  )
}

const Root = () => {
  return (
    <div style={{height: '100%'}}>
      <Route render={({ location }) => (
          <CSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <Route location={location} key={location.pathname}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/allergies" component={Allergies} />
                <Route path="/orders" component={Orders} />
              </Switch>
            </Route>
          </CSSTransitionGroup>
        )}
      />
    </div>
  );
}

class PatientNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);

    this.state = { navIsOpen: true };
  }

  toggleNav() {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  render() {
    const { app } = this.props;

    return (
      <Router>
        <div style={{ height: '100%' }}>
          <ContentContainer
            fill
            header={(<div style={{ height: '44px', backgroundColor: 'lightblue'}}><Button text="Toggle" onClick={this.toggleNav} /></div>)}
          >
            <SlidePanel
              isOpen={this.state.navIsOpen}
              panelBehavior="squish"
              panelPosition="start"
              fill
              panelContent={<RootNav />}
              mainContent={<Root />}
            />
          </ContentContainer>
        </div>
      </Router>
    );
  }
}

PatientNavigation.propTypes = propTypes;

export default PatientNavigation;

const disclosureName = 'PatientNavigation';
AppDelegate.registerComponentForDisclosure(disclosureName, PatientNavigation);
export { disclosureName };
