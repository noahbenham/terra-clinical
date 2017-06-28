import React from 'react';
import Button from 'terra-button';
import ContentContainer from 'terra-content-container';
import Navigation from 'terra-clinical-navigation';
import IconMenu from 'terra-icon/lib/icon/IconMenu';
import ContentShellExample from './ContentShellExample';

class MenuExample extends React.Component {
  render() {
    const { 
      ...customProps
    } = this.props;

    let button;
    if ((this.props.hasParentMenu || this.props.menu) && this.props.size !== 'tiny') {
      button = <Button onClick={this.props.requestToggleMenu} icon={<IconMenu />} />;
    }

    return (
      <Navigation {...customProps}>
        <ContentShellExample>
          <ContentContainer  fill header={button} />
        </ContentShellExample>
      </Navigation>
    );
  }
}

export default MenuExample;
