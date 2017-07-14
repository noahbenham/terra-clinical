import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import BurgerMenu from './BurgerMenu';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const defaultProps = {
  navigationData: {},
};

class BurgerNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getContent() {
    const { navigationData, updateNavigation } = this.props;

    if (navigationData.selectedContent === 'HAMBURGER') {
      return (
        <div>
          <h2>BurgerNavigation</h2>
          <h3>Hamburger</h3>
          {(!navigationData || !navigationData.selectedContent) && <h4>Default</h4>}
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'HAMBURGER' })}>View Hamburger</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'CHEESEBURGER' })}>View Cheeseburger</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'CHEESEBURGER') {
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
        <h3>Please select a Burger from the menu</h3>
      </div>
    );
  }

  handleUpdate(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('BURGER NAV - GETTING PROPS');
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return (
      <Navigation
        menuClass={navigation_hoc('BURGER-NAV')(BurgerMenu)}
        menuBreakpoint="huge"
        menuProps={{}}
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

BurgerNavigation.defaultProps = defaultProps;

export default navigation_hoc('BURGER-NAV')(BurgerNavigation);
