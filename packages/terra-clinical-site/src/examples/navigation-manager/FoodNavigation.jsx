import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import FoodMenu from './FoodMenu';
import BurgerNavigation from './BurgerNavigation';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

class FoodNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

        //   <div>
        //   <h2>FoodNavigation</h2>
        //   <h3>Burgers</h3>
        //   {(!navigationState || !navigationState.selectedContent) && <h4>Default</h4>}
        //   <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'BURGERS' })}>View Burgers</Button>
        //   <Button onClick={this.handleUpdate({ selectedContent: 'DRINKS' })}>View Drinks</Button>
        // </div>


  getContent() {
    const { navigationState, updateNavigation } = this.props;

    if (!navigationState || !navigationState.selectedContent || navigationState.selectedContent === 'BURGERS') {
      return (
        <BurgerNavigation navigationKey="BURGER_NAV_BOI" />
      );
    } else if (navigationState.selectedContent === 'DRINKS') {
      return (
        <div>
          <h2>FoodNavigation</h2>
          <h3>Drinks</h3>
          <Button onClick={this.handleUpdate({ selectedContent: 'BURGERS' })}>View Burgers</Button>
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'DRINKS' })}>View Drinks</Button>
        </div>
      );
    }

    return (
      <div>
        <h2>FoodNavigation</h2>
        <h3>Page Unknown</h3>
      </div>
    );
  }

  handleUpdate(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const menuProps = {
      navigationKey: this.props.navigationKey,
      updateNavigation: this.props.updateNavigation,
    };

    debugger;

    return (
      <Navigation
        menuClass={FoodMenu}
        menuBreakpoint="huge"
        menuProps={menuProps}
        size={this.props.size}
        index={this.props.index}
        navigationKey={this.props.navigationKey}
        navigationState={this.props.navigationState}
        requestToggleMenu={this.props.requestToggleMenu}
        registerNavigation={this.props.registerNavigation}
        deregisterNavigation={this.props.deregisterNavigation}
      >
        {this.getContent()}
      </Navigation>
    );
  }
}

export default navigation_hoc(FoodNavigation);
