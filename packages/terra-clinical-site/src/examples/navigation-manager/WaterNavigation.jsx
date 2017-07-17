import React, { PropTypes } from 'react';
import Navigation from 'terra-clinical-navigation';
import Button from 'terra-button';
import AppDelegate from 'terra-app-delegate';
import WaterMenu from './WaterMenu';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const propTypes = {
  app: AppDelegate.propType,

  index: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.func,
  registerNavigation: PropTypes.func.isRequired,
  deregisterNavigation: PropTypes.func.isRequired,

  navigationData: PropTypes.object,
  navigationUpdateId: PropTypes.string,
  updateNavigation: PropTypes.func.isRequired,
};

const defaultProps = {
  navigationData: {},
};

class WaterNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);
    this.changeWaterState = this.changeWaterState.bind(this);
  }

  getContent() {
    const { navigationData, navigationUpdateId, updateNavigation } = this.props;

    if (navigationData.selectedContent === 'DASANI') {
      return (
        <div>
          <h2>WaterNavigation</h2>
          <h3>Dasani</h3>
          <Button isDisabled onClick={this.changeWaterState({ selectedContent: 'DASANI' })}>View Dasani</Button>
          <Button onClick={this.changeWaterState({ selectedContent: 'FUJI' })}>View Fuji</Button>
          <Button onClick={this.changeWaterState({ selectedContent: 'PLAIN-OL-TAP' })}>View Plain Ol' Tap</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'FUJI') {
      return (
        <div>
          <h2>WaterNavigation</h2>
          <h3>Fuji</h3>
          <Button onClick={this.changeWaterState({ selectedContent: 'DASANI' })}>View Dasani</Button>
          <Button isDisabled onClick={this.changeWaterState({ selectedContent: 'FUJI' })}>View Fuji</Button>
          <Button onClick={this.changeWaterState({ selectedContent: 'PLAIN-OL-TAP' })}>View Plain Ol' Tap</Button>
        </div>
      );
    } else if (navigationData.selectedContent === 'PLAIN-OL-TAP') {
      return (
        <div>
          <h2>WaterNavigation</h2>
          <h3>Plain Ol' Tap</h3>
          <Button onClick={this.changeWaterState({ selectedContent: 'DASANI' })}>View Dasani</Button>
          <Button onClick={this.changeWaterState({ selectedContent: 'FUJI' })}>View Fuji</Button>
          <Button isDisabled onClick={this.changeWaterState({ selectedContent: 'PLAIN-OL-TAP' })}>View Plain Ol' Tap</Button>
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

  changeWaterState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const { app, size, index, closeMenu, openMenu, registerNavigation, deregisterNavigation, updateNavigation } = this.props;

    const menuProps = {
      app: this.props.app,
      updateNavigation: this.props.updateNavigation,
    };

    return (
      <Navigation
        app={app}
        menuClass={WaterMenu}
        menuBreakpoint="huge"
        menuProps={menuProps}
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

WaterNavigation.propTypes = propTypes;
WaterNavigation.defaultProps = defaultProps;

export default navigation_hoc('WATER-NAV')(WaterNavigation);
