import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';

class DrinkMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  // handleDisclosure1() {
  //   if (this.props.discloseContent) {
  //     if (this.props.requestToggleMenu) {
  //       this.props.requestToggleMenu();
  //     }

  //     this.props.discloseContent(
  //     {
  //       key: '2525-woooo',
  //       name: 'customStuff',
  //     });
  //   }
  // }

  handleUpdate(data) {
    return () => {
      this.props.updateNavigation(data);
    };
  }

  render() {
    const {
      app,
      discloseContent,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      size,
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
        <div>
          {button1}
          {button2}
          {button3}
        </div>
        {<Button text="Coke" onClick={this.handleUpdate({ selectedContent: 'COKE' })} isBlock icon={<IconProjects />} />};
        {<Button text="Water" onClick={this.handleUpdate({ selectedContent: 'WATER' })} isBlock icon={<IconProjects />} />};
      </div>
    );

    return (
      <ContentContainer fill header={headerButtons} style={{ backgroundColor: 'green' }} />
    );
  }
}

export default DrinkMenu;
