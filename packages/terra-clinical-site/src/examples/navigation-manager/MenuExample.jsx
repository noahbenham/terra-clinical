import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconReply from 'terra-icon/lib/icon/IconReply';

class MenuExample extends React.Component {
  render() {
    const { 
      app,
      requestOpenParentMenu,
      requestToggleMenu,
      ...customProps
    } = this.props;

    let button;
    if (requestOpenParentMenu) {
      button = <Button onClick={requestOpenParentMenu} icon={<IconReply />} />;
    }

    return (
      <ContentContainer {...customProps} fill header={button} />
    );
  }
}

export default MenuExample;
