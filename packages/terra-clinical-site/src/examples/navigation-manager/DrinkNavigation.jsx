import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import DrinkMenu from './DrinkMenu';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

class DrinkNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getContent() {
    const { navigationData, updateNavigation } = this.props;

    if (!navigationData || !navigationData.selectedContent || navigationData.selectedContent === 'COKE') {
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
        <div>
          <h2>DrinkNavigation</h2>
          <h3>Water</h3>
          <Button onClick={this.handleUpdate({ selectedContent: 'COKE' })}>View Coke</Button>
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'WATER' })}>View Water</Button>
        </div>
      );
    }

    return (
      <div>
        <h2>DrinkNavigation</h2>
        <h3>Unknown type {navigationData.selectedContent}</h3>
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
        navigationKey={this.props.navigationKey}
        navigationData={this.props.navigationData}
        navigationUpdateId={this.props.navigationUpdateId}
        requestToggleMenu={this.props.requestToggleMenu}
        registerNavigation={this.props.registerNavigation}
        deregisterNavigation={this.props.deregisterNavigation}
      >
        {this.getContent()}
      </Navigation>
    );
  }
}

export default navigation_hoc('DRINK-NAV')(DrinkNavigation);
