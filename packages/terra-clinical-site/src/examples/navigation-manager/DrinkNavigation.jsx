import React, { PropTypes } from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';
import DrinkMenu from './DrinkMenu';
import WaterNavigation from './WaterNavigation';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const propTypes = {
  app: AppDelegate.propType,

  index: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  registerNavigation: PropTypes.func.isRequired,
  deregisterNavigation: PropTypes.func.isRequired,

  navigationData: PropTypes.object,
  navigationUpdateId: PropTypes.string,
  updateNavigation: PropTypes.func.isRequired,
};

const defaultProps = {
  navigationData: {},
};

class DrinkNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.changeDrinkState = this.changeDrinkState.bind(this);
  }

  getContent() {
    const { navigationData, navigationUpdateId, updateNavigation } = this.props;

    if (navigationData.selectedContent === 'COKE') {
      return (
        <div>
          <h2>DrinkNavigation</h2>
          <h3>Coke</h3>
          {(!navigationData || !navigationData.selectedContent) && <h4>Default</h4>}
          <Button isDisabled onClick={this.changeDrinkState({ selectedContent: 'COKE' })}>View Coke</Button>
          <Button onClick={this.changeDrinkState({ selectedContent: 'WATER' })}>View Water</Button>
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

  changeDrinkState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const { app, size, index, toggleMenu, registerNavigation, deregisterNavigation, updateNavigation } = this.props;

    const menuProps = {
      updateNavigation: updateNavigation,
    };

    return (
      <Navigation
        app={app}
        menuClass={DrinkMenu}
        menuBreakpoint="huge"
        menuProps={menuProps}
        size={size}
        index={index}
        toggleMenu={toggleMenu}
        registerNavigation={registerNavigation}
        deregisterNavigation={deregisterNavigation}
      >
        {this.getContent()}
      </Navigation>
    );
  }
}

DrinkNavigation.propTypes = propTypes;
DrinkNavigation.defaultProps = defaultProps;

export default navigation_hoc('DRINK-NAV')(DrinkNavigation);
