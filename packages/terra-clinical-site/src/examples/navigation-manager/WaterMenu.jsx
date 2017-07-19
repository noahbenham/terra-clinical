import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

import { disclosureName } from './WaterMenuModal';

const propTypes = {
  app: AppDelegate.propType,
  navManager: NavManagerDelegate.propType,
  updateNavigation: PropTypes.func.isRequired,
};

class WaterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.updateWaterState = this.updateWaterState.bind(this);
    this.handleSecret = this.handleSecret.bind(this);
  }

  updateWaterState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  handleSecret() {
    return () => {
      this.props.app.disclose({
        preferredType: 'modal',
        content: {
          key: 'WaterMenuModal',
          name: disclosureName
        }
      })
    };
  }

  render() {
    const {
      app,
      navManager,
    } = this.props;

    return (
      <ContentContainer fill header={<MenuToolbar navManager={navManager} />} style={{ backgroundColor: 'lightblue' }}>
        <div>
          <h3>Drink Menu</h3>
          <br />
          <h4>Dasani</h4>
          <Button text="Dasani" onClick={this.updateWaterState({ selectedContent: 'DASANI' })}  icon={<IconProjects />} />
          <h4>Fuji</h4>
          <Button text="Fuji" onClick={this.updateWaterState({ selectedContent: 'FUJI' })}  icon={<IconProjects />} />
          <h4>Plain Ol' Tap</h4>
          <Button text="Plain Ol' Tap" onClick={this.updateWaterState({ selectedContent: 'PLAIN-OL-TAP' })}  icon={<IconProjects />} />
          <h4>Top Secret</h4>
          <Button text="Shhh" onClick={this.handleSecret()}  icon={<IconProjects />} />
        </div>
      </ContentContainer>
    );
  }
}

export default WaterMenu;
