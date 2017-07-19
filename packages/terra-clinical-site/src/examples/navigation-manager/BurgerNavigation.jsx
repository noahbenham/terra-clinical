import React, { PropTypes } from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import BurgerMenu from './BurgerMenu';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const propTypes = {
  app: AppDelegate.propType,
  navManager: NavManagerDelegate.propType,
  navigationData: PropTypes.object,
  updateNavigation: PropTypes.func.isRequired,
};

const defaultProps = {
  navigationData: {},
};

class BurgerNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.changeBurgerState = this.changeBurgerState.bind(this);
  }

  getContent() {
    const { navigationData, updateNavigation } = this.props;

    if (navigationData.selectedContent === 'HAMBURGER') {
      return (
        <div>
          <h2>BurgerNavigation</h2>
          <h3>Hamburger</h3>
          {(!navigationData || !navigationData.selectedContent) && <h4>Default</h4>}
          <Button isDisabled onClick={this.changeBurgerState({ selectedContent: 'HAMBURGER' })}>View Hamburger</Button>
          <Button onClick={this.changeBurgerState({ selectedContent: 'CHEESEBURGER' })}>View Cheeseburger</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'CHEESEBURGER') {
      return (
        <div>
          <h2>BurgerNavigation</h2>
          <h3>Cheeseburger</h3>
          <Button onClick={this.changeBurgerState({ selectedContent: 'HAMBURGER' })}>View Hamburger</Button>
          <Button isDisabled onClick={this.changeBurgerState({ selectedContent: 'CHEESEBURGER' })}>View Cheeseburger</Button>
        </div>
      );
    }

    return (
      <div>
        <h2>BurgerNavigation</h2>
        <h3>Please select a Burger from the menu</h3>
      </div>
    );
  }

  changeBurgerState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const { app, size, index, closeMenu, openMenu, registerNavigation, deregisterNavigation, updateNavigation } = this.props;

    return (
      <Navigation
        app={app}
        menuClass={BurgerMenu}
        menuBreakpoint="huge"
        size={size}
        index={index}
        closeMenu={closeMenu}
        openMenu={openMenu}
        registerNavigation={registerNavigation}
        deregisterNavigation={deregisterNavigation}
      >
        {this.getContent()}
      </Navigation>
    );
  }
}

BurgerNavigation.propTypes = propTypes;
BurgerNavigation.defaultProps = defaultProps;

export default navigation_hoc('BURGER-NAV')(BurgerNavigation);
