import React from 'react';

class ContentShellExample extends React.Component {
  render() {
    const {
      app,
      children,
      color,
    } = this.props;

    return (
      <div style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: color }}>
        {children}
      </div>
    );
  }
}

export default ContentShellExample;
