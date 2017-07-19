import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

const propTypes = {
  app: AppDelegate.propType,
  navManager: NavManagerDelegate.propType,
};

class DrinkMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeDrinkState = this.changeDrinkState.bind(this);
  }

  changeDrinkState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const {
      app,
      navManager,
    } = this.props;

    return (
      <ContentContainer fill header={<MenuToolbar navManager={navManager} />} style={{ backgroundColor: 'red' }}>
        <div>
          <h3>Drink Menu</h3>
          <br />
          <h4>Coke</h4>
          <Button text="Coke" onClick={this.changeDrinkState({ selectedContent: 'COKE' })}  icon={<IconProjects />} />
          <h4>Water</h4>
          <Button text="Water" onClick={this.changeDrinkState({ selectedContent: 'WATER' })}  icon={<IconProjects />} />
        </div>
      </ContentContainer>
    );
  }
}

export default DrinkMenu;
