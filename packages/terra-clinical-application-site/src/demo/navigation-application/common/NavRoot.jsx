import React from 'react';

import SlidePanel from 'terra-slide-panel';
import ContentContainer from 'terra-content-container';
import Button from 'terra-button';

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
      backPathname: undefined,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      backPathname: undefined,
    });
  }

  onBack() {
    const { routeConfig, location } = this.props;

    const parentPath = routeConfig.routes[this.state.backPathname || location.pathname].parentPath;
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
              <div style={{ height: '100%' }} key={location}>
                <Switch location={(this.state.backPathname && { pathname: this.state.backPathname }) || location}>
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

export default withRouter(NavRoot);
