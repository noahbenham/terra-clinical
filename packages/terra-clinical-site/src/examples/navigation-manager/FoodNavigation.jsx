import React from 'react';
import PropTypes from 'prop-types';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import FoodMenu from './FoodMenu';
import BurgerNavigation from './BurgerNavigation';
import DrinkNavigation from './DrinkNavigation';
import FoodLandingPage from './FoodLandingPage';
import AppDelegate from 'terra-app-delegate';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const propTypes = {
  app: AppDelegate.propType,
  navManager: NavManagerDelegate.propType,
  navigationData: PropTypes.object,
  navigationUpdateId: PropTypes.string,
  updateNavigation: PropTypes.func.isRequired,
};

const defaultProps = {
  navigationData: {},
};

class FoodNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.changeFoodState = this.changeFoodState.bind(this);
  }

  getContent() {
    const { navigationData, navigationUpdateId, updateNavigation } = this.props;

    if (navigationData && navigationData.selectedContent === 'BURGERS') {
      return (
        <BurgerNavigation key={navigationUpdateId} />
      );
    } else if (navigationData && navigationData.selectedContent === 'DRINKS') {
      return (
        <DrinkNavigation key={navigationUpdateId} />
      );
    }

    return (
      <FoodLandingPage />
    );
  }

  changeFoodState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const { app, navManager, updateNavigation } = this.props;

    const menuProps = {
      updateNavigation: this.props.updateNavigation,
    };

    return (
      <Navigation
        app={app}
        menuClass={FoodMenu}
        menuBreakpoint="huge"
        menuProps={menuProps}
        navManager={navManager}
      >
        {this.getContent()}
      </Navigation>
    );
  }
}

export default navigation_hoc('FOOD-NAV')(FoodNavigation);
