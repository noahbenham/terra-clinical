import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';
import IconHouse from 'terra-icon/lib/icon/IconHouse';
import IconClose from 'terra-icon/lib/icon/IconClose';

class MenuExample extends React.Component {
  render() {
    const { 
      app,
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

    const headerButtons = (
      <div>
        {button1}
        {button2}
        {button3}
      </div>
    );

    return (
      <ContentContainer {...customProps} fill header={headerButtons} />
    );
  }
}

export default MenuExample;
