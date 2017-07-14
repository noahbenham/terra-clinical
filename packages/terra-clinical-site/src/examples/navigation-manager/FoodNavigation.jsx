import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import FoodMenu from './FoodMenu';
import BurgerNavigation from './BurgerNavigation';
import DrinkNavigation from './DrinkNavigation';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

class FoodNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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
      <div>
        <h2>FoodNavigation</h2>
        <h3>Please pick a food type from the menu</h3>
      </div>
    );
  }

  handleUpdate(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('FOOD NAV - GETTING PROPS');
  }

  render() {
    const menuProps = {
      navigationKey: this.props.navigationKey,
      updateNavigation: this.props.updateNavigation,
    };

    return (
      <Navigation
        app={this.props.app}
        menuClass={FoodMenu}
        menuBreakpoint="huge"
        menuProps={menuProps}
        size={this.props.size}
        index={this.props.index}
        requestToggleMenu={this.props.requestToggleMenu}
        registerNavigation={this.props.registerNavigation}
        deregisterNavigation={this.props.deregisterNavigation}
      >
        {this.getContent()}
      </Navigation>
    );
  }
}

export default navigation_hoc('FOOD-NAV')(FoodNavigation);
