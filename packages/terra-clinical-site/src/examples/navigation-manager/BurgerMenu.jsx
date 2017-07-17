import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';
import navigation_hoc, { reducers as navigationReducers } from 'terra-clinical-navigation/lib/navigation_hoc';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';

const propTypes = {
  app: AppDelegate.propType,

  size: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.func,
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
      closeMenu,
      openMenu,
      pinMenu,
      unpinMenu,
      size,
      navigationData,
    } = this.props;

    const toolbarProps = {
      presentRootMenu,
      presentParentMenu,
      closeMenu,
      pinMenu,
      unpinMenu,
    };

    return (
      <ContentContainer fill header={<MenuToolbar {...toolbarProps} />} style={{ backgroundColor: 'orange' }}>
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
