import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';

const propTypes = {
  app: AppDelegate.propType,

  size: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  presentRootMenu: PropTypes.func,
  presentParentMenu: PropTypes.func,

  navigationData: PropTypes.object,
  updateNavigation: PropTypes.func.isRequired,
};

const defaultProps = {
  navigationData: {},
};

class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.changeBurgerState = this.changeBurgerState.bind(this);
  }

  changeBurgerState(data) {
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
      navigationData,
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
      <ContentContainer fill header={headerButtons} style={{ backgroundColor: 'orange' }}>
        <div>
          <h3>Burger Menu</h3>
          <br />
          <h4>Hamburger</h4>
          <Button isDisabled={navigationData.selectedContent === 'HAMBURGER'} text="Hamburger" onClick={this.changeBurgerState({ selectedContent: 'HAMBURGER' })} icon={<IconProjects />} />
          <h4>Cheeseburger</h4>
          <Button isDisabled={navigationData.selectedContent === 'CHEESEBURGER'} text="Cheeseburger" onClick={this.changeBurgerState({ selectedContent: 'CHEESEBURGER' })} icon={<IconProjects />} />
        </div>
      </ContentContainer>
    );
  }
}

BurgerMenu.propTypes = propTypes;
BurgerMenu.defaultProps = defaultProps;

export default navigation_hoc('BURGER-NAV')(BurgerMenu);
