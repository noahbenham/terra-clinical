import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import IconProjects from 'terra-icon/lib/icon/IconProjects';

class CustomContentParent extends React.Component {
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
        content: {
          key: '1234-woooo',
          name: 'contentStuff',
          props: { color: 'orange' },
        }
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
        content: {
          key: '4321-woooo',
          name: 'contentStuff',
          props: { color: 'purple' },
        }
      });
    }
  }

  render() {
    const { 
      children,
      discloseContent,
      size
    } = this.props;

    let button1;
    let button2;

    if (size !== 'tiny') {
      if (discloseContent) {
        button1 = <Button text=" disclose 1" style={{ display: 'inline-block' }} onClick={this.handleDisclosure1} icon={<IconProjects />} />;
        button2 = <Button text=" disclose 2" style={{ display: 'inline-block' }} onClick={this.handleDisclosure2} icon={<IconProjects />} />;
      }
    }
    return (
      <ContentContainer fill header={<div style={{ backgroundColor: 'yellow' }}>{button1}{button2}</div>}>
        {children}
      </ContentContainer>
    );
  }
}

export default CustomContentParent;
