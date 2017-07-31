import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppDelegate from 'terra-app-delegate';
import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';

import routeConfig from './routeConfig';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const propTypes = {
  app: AppDelegate.propType,
};

class RootNav extends React.Component {
  constructor(props) {
    super(props);

    this.displayParentMenu = this.displayParentMenu.bind(this);
    this.linkTo = this.linkTo.bind(this);
  }

  displayParentMenu() {
    this.props.onBack(this.props.location.pathname);
  }

  linkTo(data) {

  }

  render() {
    const menuRoutes = Object.keys(routeConfig.routes).map((routeKey) => {
      const route = routeConfig.routes[routeKey];
      return (
        <Route
          exact={route.exact}
          path={route.path}
          key={route.path}
          render={(props) => {
            const Component = route.menuComponent;
            return <Component {...props} goBack={this.displayParentMenu} linkTo={this.linkTo} />;
          }}
        />
      );
    });

    return (
      <div>
        <Switch location={(this.props.backPathname && { pathname: this.props.backPathname }) || this.props.location}>
          {menuRoutes}
        </Switch>
      </div>
    );
  }
}

const Root = () => {
  const routes = Object.keys(routeConfig.routes).map((routeKey) => {
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

  return (
    <div style={{ height: '100%' }}>
      <Switch>
        {routes}
      </Switch>
    </div>
  );
};

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        backPathname: undefined,
      });
    }
  }

  onBack(currentPath) {
    const parentPath = this.routeConfig.routes[currentPath].parentPath;

    if (parentPath) {
      this.setState({
        backPathname: parentPath,
      });
    }
  }

  toggleNav() {
    const newState = {
      navIsOpen: !this.state.navIsOpen,
      backPathname: undefined,
    };

    this.setState(newState);
  }

  render() {
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
            panelContent={<RootNav location={this.props.location} key={this.props.location.pathname} config={this.routeConfig} backPathname={this.state.backPathname} onBack={this.onBack} />}
            mainContent={<Root />}
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

PatientNavigation.propTypes = propTypes;

export default PatientNavigation;

const disclosureName = 'PatientNavigation';
AppDelegate.registerComponentForDisclosure(disclosureName, PatientNavigation);
export { disclosureName };
