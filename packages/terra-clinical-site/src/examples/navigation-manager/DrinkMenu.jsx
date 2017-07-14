import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';

const propTypes = {
  app: AppDelegate.propType,

  size: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func,
  presentRootMenu: PropTypes.func,
  presentParentMenu: PropTypes.func,
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
      <ContentContainer fill header={headerButtons} style={{ backgroundColor: 'red' }}>
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
