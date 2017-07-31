import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppDelegate from 'terra-app-delegate';
import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';

import routeConfig from './routeConfig';

import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

class NavRoot extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.onBack = this.onBack.bind(this);
    this.routeConfig = routeConfig;

    this.state = {
      navIsOpen: true,
      backPathname: undefined,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      backPathname: undefined,
    });
  }

  onBack() {
    const parentPath = this.routeConfig.routes[this.props.location.pathname].parentPath;

    if (parentPath) {
      this.setState({
        backPathname: parentPath,
      });
    }
  }

  toggleNav() {
    const newState = {
      navIsOpen: !this.state.navIsOpen,
    };

    if (newState.navIsOpen) {
      newState.backPathname = undefined;
    }

    this.setState(newState);
  }

  render() {
    const contentRoutes = Object.keys(routeConfig.routes).map((routeKey) => {
      const route = routeConfig.routes[routeKey];
      return (
        <Route
          exact={route.exact}
          path={route.path}
          key={route.path}
          render={(props) => {
            const Component = route.component;
            return <Component {...props} />;
          }}
        />
      );
    });

    const menuRoutes = Object.keys(routeConfig.routes).map((routeKey) => {
      const route = routeConfig.routes[routeKey];
      return (
        <Route
          exact={route.exact}
          path={route.path}
          key={route.path}
          render={(props) => {
            const Component = route.menuComponent;
            return <Component {...props} goBack={this.onBack} />;
          }}
        />
      );
    });

    return (
      <div style={{ height: '100%' }}>
        <ContentContainer
          fill
          header={(<div style={{ height: '44px', backgroundColor: 'lightblue' }}><Button text="Toggle" onClick={this.toggleNav} /></div>)}
        >
          <SlidePanel
            isOpen={this.state.navIsOpen}
            panelBehavior="squish"
            panelPosition="start"
            fill
            panelContent={(
              <div style={{ height: '100%' }} key={this.props.location}>
                <Switch location={(this.state.backPathname && { pathname: this.state.backPathname }) || this.props.location}>
                  {menuRoutes}
                </Switch>
              </div>
            )}
            mainContent={(
              <div style={{ height: '100%' }}>
                <Switch>
                  {contentRoutes}
                </Switch>
              </div>
            )}
          />
        </ContentContainer>
      </div>
    );
  }
}

class PatientNavigation extends React.Component {
  render() {
    return (
      <Router>
        <Route
          render={props => (
            <NavRoot {...props} />
          )}
        />
      </Router>
    );
  }
}

export default PatientNavigation;

const disclosureName = 'PatientNavigation';
AppDelegate.registerComponentForDisclosure(disclosureName, PatientNavigation);
export { disclosureName };
