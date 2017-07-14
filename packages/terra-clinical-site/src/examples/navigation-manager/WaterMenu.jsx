import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';

import { disclosureName } from './WaterMenuModal';

const propTypes = {
  app: AppDelegate.propType,

  size: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func,
  presentRootMenu: PropTypes.func,
  presentParentMenu: PropTypes.func.isRequired,

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
      presentRootMenu,
      presentParentMenu,
      toggleMenu,
      size,
    } = this.props;

    let button1;
    if (presentParentMenu) {
      button1 = <Button style={{ display: 'inline-block' }} onClick={presentParentMenu} icon={<IconReply />} />;
    }
    let button2;
    if (presentRootMenu) {
      button2 = <Button style={{ display: 'inline-block' }} onClick={presentRootMenu} icon={<IconHouse />} />;
    }
    let button3;
    if (toggleMenu) {
      button3 = <Button style={{ display: 'inline-block', float: 'right' }} onClick={toggleMenu} icon={<IconClose />} />;
    }

    const headerButtons = (
      <div>
        {button1}
        {button2}
        {button3}
      </div>
    );

    return (
      <ContentContainer fill header={headerButtons} style={{ backgroundColor: 'lightblue' }}>
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
