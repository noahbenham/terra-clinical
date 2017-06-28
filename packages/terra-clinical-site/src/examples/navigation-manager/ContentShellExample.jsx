import React from 'react';

class ContentShellExample extends React.Component {
  render() {
    const {
      app,
      children,
    } = this.props;

    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        {children}
      </div>
    );
  }
}

export default ContentShellExample;
