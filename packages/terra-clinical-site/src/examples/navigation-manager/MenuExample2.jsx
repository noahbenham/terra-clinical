import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';

class MenuExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleDisclosure1 = this.handleDisclosure1.bind(this);
    this.handleDisclosure2 = this.handleDisclosure2.bind(this);
  }

  handleDisclosure1() {
    if (this.props.discloseContent) {
      if (this.props.requestToggleMenu) {
        this.props.requestToggleMenu();
      }

      this.props.discloseContent(
      {
        key: '1234-woooo',
        name: 'contentStuff',
        props: { color: 'orange' },
      });
    }
  }

  handleDisclosure2() {
    if (this.props.discloseContent) {
      if (this.props.requestToggleMenu) {
        this.props.requestToggleMenu();
      }

      this.props.discloseContent(
      {
        key: '4321-woooo',
        name: 'contentStuff',
        props: { color: 'purple' },
      });
    }
  }

  render() {
    const { 
      app,
      discloseContent,
      requestOpenHomeMenu,
      requestOpenParentMenu,
      requestToggleMenu,
      size,
      ...customProps
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

    let button4;
    let button5;
    if (discloseContent && size === 'tiny') {
      button4 = <Button text=" disclose 1" onClick={this.handleDisclosure1} isBlock icon={<IconProjects />} />;
      button5 = <Button text=" disclose 2" onClick={this.handleDisclosure2} isBlock icon={<IconProjects />} />;
    }

    const headerButtons = (
      <div>
        <div>
          {button1}
          {button2}
          {button3}
        </div>
        {button4}
        {button5}
      </div>
    );

    return (
      <ContentContainer {...customProps} fill header={headerButtons} style={{ backgroundColor: 'red' }}  />
    );
  }
}

export default MenuExample;
