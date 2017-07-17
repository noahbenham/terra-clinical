import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconProjects from 'terra-icon/lib/icon/IconProjects';
import AppDelegate from 'terra-app-delegate';
import MenuToolbar from 'terra-clinical-navigation/lib/NavigationMenuToolbar';

const propTypes = {
  closeMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.func,
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
      closeMenu,
      openMenu,
      pinMenu,
      unpinMenu,
    } = this.props;

    const toolbarProps = {
      presentRootMenu,
      presentParentMenu,
      closeMenu,
      pinMenu,
      unpinMenu,
    };

    const headerButtons = (
      <div>
        <MenuToolbar {...toolbarProps} />
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
