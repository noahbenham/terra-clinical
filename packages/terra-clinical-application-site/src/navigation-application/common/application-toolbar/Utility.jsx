import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import Button from 'terra-button';
import Popup from 'terra-popup';
import IconExpandMore from 'terra-icon/lib/icon/IconExpandMore';

import './Utility.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  accessory: PropTypes.element,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  app: AppDelegate.propType,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  menuName: PropTypes.string,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  menuProps: PropTypes.object,
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   * */
  title: PropTypes.string,
};

class Utility extends React.Component {
  constructor(props) {
    super(props);
    this.launchPopup = this.launchPopup.bind(this);
    this.dismissPopup = this.dismissPopup.bind(this);

    this.state = {
      popupIsOpen: false,
    };
  }

  launchPopup() {
    this.setState({
      popupIsOpen: true,
    });
  }

  dismissPopup() {
    this.setState({
      popupIsOpen: false,
    });
  }

  render() {
    const {
      app,
      accessory,
      menuName,
      menuProps,
      size,
      title,
      ...customProps
    } = this.props;

    const utilityClassNames = classNames([
      'terraClinical-NavigationUtility',
      { 'terraClinical-NavigationUtility--compact': size === 'tiny' || size === 'small' },
      customProps.className,
    ]);

    return (
      <div ref={this.setPopupTargetRef}>
        <Popup
          isArrowDisplayed
          contentAttachment="top right"
          isOpen={this.state.popupIsOpen}
          onRequestClose={this.dismissPopup}
          targetRef={() => document.getElementById('terra-clinical-nav-utils')}
          contentHeight="40"
        >
          <Button
            variant="link"
            isBlock
            text="Log out"
            onClick={() => {
              window.location = '/authn/logout';
            }}
          />
        </Popup>
        <Button {...customProps} className={utilityClassNames} onClick={this.launchPopup} variant="link">
          {!!title && size !== 'tiny' && <div className="terraClinical-NavigationUtility-title">{title}</div>}
          {!!accessory && <div className="terraClinical-NavigationUtility-accessory">{accessory}</div>}
          {<IconExpandMore id="terra-clinical-nav-utils" />}
        </Button>
      </div>
    );
  }
}

Utility.propTypes = propTypes;

export default Utility;
