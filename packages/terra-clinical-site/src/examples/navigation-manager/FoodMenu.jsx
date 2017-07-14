import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';

const propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  presentRootMenu: PropTypes.func,
  presentParentMenu: PropTypes.func,
  updateNavigation: PropTypes.func.isRequired,
};

const defaultProps = {
  navigationData: {},
};

class FoodMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeFoodState = this.changeFoodState.bind(this);
  }

  changeFoodState(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const {
      presentRootMenu,
      presentParentMenu,
      toggleMenu,
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
        <div>
          {button1}
          {button2}
          {button3}
        </div>
        {<Button text="Burgers" onClick={this.changeFoodState({ selectedContent: 'BURGERS' })} isBlock icon={<IconProjects />} />};
        {<Button text="Drinks" onClick={this.changeFoodState({ selectedContent: 'DRINKS' })} isBlock icon={<IconProjects />} />};
      </div>
    );

    return (
      <ContentContainer fill header={headerButtons} style={{ backgroundColor: 'green' }} />
    );
  }
}

FoodMenu.propTypes = propTypes;
FoodMenu.defaultProps = defaultProps;

export default FoodMenu;
