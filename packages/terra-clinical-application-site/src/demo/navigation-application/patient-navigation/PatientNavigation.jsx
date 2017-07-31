import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { connect } from 'react-redux';
import AppDelegate from 'terra-app-delegate';
import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';

import routeConfig from './routeConfig';

import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const propTypes = {
  app: AppDelegate.propType,
};

const RootNav = () => {
  const menuRoutes = routeConfig.routes.map((route) => {
    return <Route exact={route.exact} path={route.path} key={route.path} render={({...props}) => {
      const Component = route.menuComponent;
      return <Component {...props} goBack={() => { console.log('Goin back')}} />;
    }} />
  });

  return (
    <div>
      <Switch>
        {menuRoutes}
      </Switch>
    </div>
  )
}

const Root = () => {
  const routes = routeConfig.routes.map((route) => {
    return <Route exact={route.exact} path={route.path} key={route.path} render={({...props}) => {
      const Component = route.component;
      return <Component {...props} testProp={'HEYO'} />;
    }} />
  });

  return (
    <div style={{height: '100%'}}>
      <Switch>
        {routes}
      </Switch>
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
