import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconProjects from 'terra-icon/lib/icon/IconProjects';

class WaterMenu extends React.Component {
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
          <Button text="Dasani" onClick={this.handleUpdate({ selectedContent: 'DASANI' })}  icon={<IconProjects />} />
          <h4>Fuji</h4>
          <Button text="Fuji" onClick={this.handleUpdate({ selectedContent: 'FUJI' })}  icon={<IconProjects />} />
          <h4>Plain Ol' Tap</h4>
          <Button text="Plain Ol' Tap" onClick={this.handleUpdate({ selectedContent: 'PLAIN-OL-TAP' })}  icon={<IconProjects />} />
        </div>
      </ContentContainer>
    );
  }
}

export default WaterMenu;
