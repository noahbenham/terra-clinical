import React from 'react';
import AppDelegate from 'terra-app-delegate';

class UtilityMenuExample extends React.Component {
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
      <div style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: 'blue' }}>
        {app && app.closeDisclosure ? <button onClick={this.closeDisclosure}>Close Disclosure</button> : null }
      </div>
    );
  }
}

export default UtilityMenuExample;
