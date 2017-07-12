import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import BurgerMenu from './BurgerMenu';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

class BurgerNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getContent() {
    const { navigationState, updateNavigation } = this.props;

    if (!navigationState || !navigationState.selectedContent || navigationState.selectedContent === 'HAMBURGER') {
      return (
        <div>
          <h2>BurgerNavigation</h2>
          <h3>Hamburger</h3>
          {(!navigationState || !navigationState.selectedContent) && <h4>Default</h4>}
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'HAMBURGER' })}>View Hamburger</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'CHEESEBURGER' })}>View Cheeseburger</Button>
        </div>
      );
    } else if (navigationState.selectedContent === 'CHEESEBURGER') {
      return (
        <div>
          <h2>BurgerNavigation</h2>
          <h3>Cheeseburger</h3>
          <Button onClick={this.handleUpdate({ selectedContent: 'HAMBURGER' })}>View Hamburger</Button>
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'CHEESEBURGER' })}>View Cheeseburger</Button>
        </div>
      );
    }

    return (
      <div>
        <h2>BurgerNavigation</h2>
        <h3>Unknown type {navigationState.selectedContent}</h3>
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
        menuClass={BurgerMenu}
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

export default navigation_hoc(BurgerNavigation);
