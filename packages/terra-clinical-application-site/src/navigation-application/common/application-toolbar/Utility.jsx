import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
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
    this.disclose = this.disclose.bind(this);
  }

  disclose() {
    if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose({
        preferredType: 'modal',
        size: 'tiny',
        content: {
          key: `${this.props.menuName}-${Date.now()}`,
          name: this.props.menuName,
          props: this.props.menuProps,
        },
      });
    }
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
      <div {...customProps} className={utilityClassNames} onClick={this.disclose}>
        {!!title && size !== 'tiny' && <div className="terraClinical-NavigationUtility-title">{title}</div>}
        {!!accessory && <div className="terraClinical-NavigationUtility-accessory">{accessory}</div>}
        {<IconExpandMore />}
      </div>
    );
  }
}

Utility.propTypes = propTypes;

export default Utility;
