import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';
import SlideGroup from 'terra-slide-group';

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

class NavRoot extends React.Component {
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
              <div style={{ height: '100%' }}>
                <CSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                  transitionEnter={!!routeConfig.routes[menuLocation.pathname]}
                  transitionLeave={!!routeConfig.routes[menuLocation.pathname]}
                >
                  <Route path={menuLocation.pathname} location={menuLocation} key={menuLocation.pathname}>
                    <Switch>
                      {menuRoutes}
                    </Switch>
                  </Route>
                </CSSTransitionGroup>
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

export default withRouter(NavRoot);
