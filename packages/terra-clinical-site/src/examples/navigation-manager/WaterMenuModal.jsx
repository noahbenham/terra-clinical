import React from 'react';
import PropTypes from 'prop-types';
import AppDelegate from 'terra-app-delegate';
import NavManagerDelegate from 'terra-clinical-navigation-manager/lib/NavManagerDelegate';

class WaterMenuModal extends React.Component {
  constructor(props) {
    super(props);

    this.dismiss = this.dismiss.bind(this);
    this.closeDisclosure = this.closeDisclosure.bind(this);
    this.goBack = this.goBack.bind(this);
    this.maximize = this.maximize.bind(this);
    this.minimize = this.minimize.bind(this);
  }

  dismiss() {
    this.props.app.dismiss();
  }

  closeDisclosure() {
    this.props.app.closeDisclosure();
  }

  goBack() {
    this.props.app.goBack();
  }

  maximize() {
    this.props.app.maximize();
  }

  minimize() {
    this.props.app.minimize();
  }

  render() {
    const { app, identifier } = this.props;

    return (
      <div style={{ height: '100%', padding: '10px' }}>
        <h2>WaterMenuModal</h2>
        <br />
        {app && app.dismiss ? <button className="dismiss" onClick={this.dismiss}>Dismiss</button> : null }
        {app && app.closeDisclosure ? <button className="close-disclosure" onClick={this.closeDisclosure}>Close Disclosure</button> : null }
        {app && app.goBack ? <button className="go-back" onClick={this.goBack}>Go Back</button> : null }
        {app && app.maximize ? <button className="maximize" onClick={this.maximize}>Maximize</button> : null }
        {app && app.minimize ? <button className="minimize" onClick={this.minimize}>Minimize</button> : null }
      </div>
    );
  }
}

WaterMenuModal.propTypes = {
  app: AppDelegate.propType,
  identifier: PropTypes.string,
};

export default WaterMenuModal;

const disclosureName = 'WaterMenuModal';
AppDelegate.registerComponentForDisclosure('WaterMenuModal', WaterMenuModal);
export { disclosureName };

