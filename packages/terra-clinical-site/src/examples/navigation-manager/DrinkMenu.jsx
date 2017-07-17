import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';

const propTypes = {
  app: AppDelegate.propType,

  size: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.func,
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
      closeMenu,
      openMenu,
      pinMenu,
      unpinMenu,
      size,
    } = this.props;

    const toolbarProps = {
      presentRootMenu,
      presentParentMenu,
      closeMenu,
      pinMenu,
      unpinMenu,
    };

    return (
      <ContentContainer fill header={<MenuToolbar {...toolbarProps} />} style={{ backgroundColor: 'red' }}>
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
