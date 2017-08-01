import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';

import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';


const propTypes = {
  location: PropTypes.object,
  routeConfig: PropTypes.object,
};

class RoutingManager extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.onBack = this.onBack.bind(this);

    this.state = {
      navIsOpen: true,
      menuPathname: undefined,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      menuPathname: undefined,
    });
  }

  onBack(sourcePath) {
    const { routeConfig } = this.props;

    const menueRoute = routeConfig.routes[this.state.menuPathname || sourcePath];
    if (menueRoute.parentPath) {
      this.setState({
        menuPathname: menueRoute.parentPath,
      });
    }
  }

  toggleNav() {
    const newState = {
      navIsOpen: !this.state.navIsOpen,
    };

    // Clear the current menu path when menu is opening (and not before,
    // to prevent the default menu presenting during menu close)
    if (newState.navIsOpen) {
      newState.menuPathname = undefined;
    }

    this.setState(newState);
  }

  render() {
    const { routeConfig, location } = this.props;

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

    const menuLocation = (this.state.menuPathname && { pathname: this.state.menuPathname }) || location;
    const currentRouteConfig = routeConfig.routes[location.pathname];
    const menuRouteConfig = routeConfig.routes[menuLocation.pathname];

    return (
      <div style={{ height: '100%', backgroundColor: 'lightgrey' }}>
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
              <div style={{ height: '100%' }}>
                <CSSTransitionGroup
                  transitionName="menu-fade"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  transitionEnter={!!menuRouteConfig}
                  transitionLeave={!!menuRouteConfig}
                >
                  <Route location={menuLocation} key={menuLocation.pathname}>
                    <Switch>
                      {menuRoutes}
                    </Switch>
                  </Route>
                </CSSTransitionGroup>
              </div>
            )}
            mainContent={(
              <div style={{ height: '100%' }}>
                <CSSTransitionGroup
                  transitionName="content-fade"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  transitionEnter={!!currentRouteConfig}
                  transitionLeave={!!currentRouteConfig}
                >
                  <Route location={location} key={location.pathname}>
                    <Switch>
                      {contentRoutes}
                      <Redirect to={routeConfig.rootRoute} />
                    </Switch>
                  </Route>
                </CSSTransitionGroup>
              </div>
            )}
          />
        </ContentContainer>
      </div>
    );
  }
}

RoutingManager.propTypes = propTypes;

export default withRouter(RoutingManager);
