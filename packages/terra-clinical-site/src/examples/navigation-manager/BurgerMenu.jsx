import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';

const defaultProps = {
  navigationData: {},
};

class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const {
      app,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      size,
      navigationData,
    } = this.props;

    let button1;
    if (requestOpenParentMenu) {
      button1 = <Button style={{ display: 'inline-block' }} onClick={requestOpenParentMenu} icon={<IconReply />} />;
    }
    let button2;
    if (requestOpenHomeMenu) {
      button2 = <Button style={{ display: 'inline-block' }} onClick={requestOpenHomeMenu} icon={<IconHouse />} />;
    }
    let button3;
    if (requestToggleMenu) {
      button3 = <Button style={{ display: 'inline-block', float: 'right' }} onClick={requestToggleMenu} icon={<IconClose />} />;
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
          <Button isDisabled={navigationData.selectedContent === 'HAMBURGER'} text="Hamburger" onClick={this.handleUpdate({ selectedContent: 'HAMBURGER' })} icon={<IconProjects />} />
          <h4>Cheeseburger</h4>
          <Button isDisabled={navigationData.selectedContent === 'CHEESEBURGER'} text="Cheeseburger" onClick={this.handleUpdate({ selectedContent: 'CHEESEBURGER' })} icon={<IconProjects />} />
        </div>
      </ContentContainer>
    );
  }
}

BurgerMenu.defaultProps = defaultProps;

export default BurgerMenu;
