import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import DrinkMenu from './DrinkMenu';
import WaterNavigation from './WaterNavigation';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const defaultProps = {
  navigationData: {},
};

class DrinkNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getContent() {
    const { navigationData, navigationUpdateId, updateNavigation } = this.props;

    if (navigationData.selectedContent === 'COKE') {
      return (
        <div>
          <h2>DrinkNavigation</h2>
          <h3>Coke</h3>
          {(!navigationData || !navigationData.selectedContent) && <h4>Default</h4>}
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'COKE' })}>View Coke</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'WATER' })}>View Water</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'WATER') {
      return (
        <WaterNavigation key={navigationUpdateId} />
      );
    }

    return (
      <div>
        <h2>DrinkNavigation</h2>
        <h3>Please select a Drink from the menu</h3>
      </div>
    );
  }

  handleUpdate(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('DRINK NAV - GETTING PROPS');
  }

  render() {
    const menuProps = {
      navigationKey: this.props.navigationKey,
      updateNavigation: this.props.updateNavigation,
    };

    return (
      <Navigation
        menuClass={DrinkMenu}
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

DrinkNavigation.defaultProps = defaultProps;

export default navigation_hoc('DRINK-NAV')(DrinkNavigation);
