import React from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import WaterMenu from './WaterMenu';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const defaultProps = {
  navigationData: {},
};

class WaterNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  getContent() {
    const { navigationData, updateNavigation } = this.props;

    if (navigationData.selectedContent === 'DASANI') {
      return (
        <div>
          <h2>WaterNavigation</h2>
          <h3>Dasani</h3>
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'DASANI' })}>View Dasani</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'FUGI' })}>View Fuji</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'PLAIN-OL-TAP' })}>View Plain Ol' Tap</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'FUJI') {
      return (
        <div>
          <h2>WaterNavigation</h2>
          <h3>Fuji</h3>
          <Button onClick={this.handleUpdate({ selectedContent: 'DASANI' })}>View Dasani</Button>
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'FUGI' })}>View Fuji</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'PLAIN-OL-TAP' })}>View Plain Ol' Tap</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'PLAIN-OL-TAP') {
      return (
        <div>
          <h2>WaterNavigation</h2>
          <h3>Plain Ol' Tap</h3>
          <Button onClick={this.handleUpdate({ selectedContent: 'DASANI' })}>View Dasani</Button>
          <Button onClick={this.handleUpdate({ selectedContent: 'FUGI' })}>View Fuji</Button>
          <Button isDisabled onClick={this.handleUpdate({ selectedContent: 'PLAIN-OL-TAP' })}>View Plain Ol' Tap</Button>
        </div>
      );
    }

    return (
      <div>
        <h2>WaterNavigation</h2>
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
        menuClass={WaterMenu}
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

WaterNavigation.defaultProps = defaultProps;

export default navigation_hoc('WATER-NAV')(WaterNavigation);
