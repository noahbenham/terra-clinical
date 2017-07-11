import React from 'react';
import AppDelegate from 'terra-app-delegate';
import Button from 'terra-button';

class UtilityMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeDisclosure = this.closeDisclosure.bind(this);
  }

  closeDisclosure() {
    this.props.app.closeDisclosure();
  }

  render() {
    const {
      app,
    } = this.props;

    return (
      <div >
        {app && app.closeDisclosure ? <Button text="Close Disclosure" onClick={this.closeDisclosure} /> : null }
      </div>
    );
  }
}

export default UtilityMenu;
