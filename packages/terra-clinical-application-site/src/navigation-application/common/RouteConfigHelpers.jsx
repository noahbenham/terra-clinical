import React from 'react';
import PropTypes from 'prop-types';

import {
  Route,
} from 'react-router-dom';

class NoMenuComponent extends React.Component {
  componentDidMount() {
    this.props.routingManagerCallback('nomenu');
  }

  render() {
    return null;
  }
}

const menuComponent = Component => (
  class MenuComponent extends React.Component {
    componentDidMount() {
      // this.props.routingManagerCallback('menu');
    }

    render() {
      const { routingManagerCallback, ...otherProps } = this.props;
      return (
        <Component {...otherProps} />
      );
    }
  }
);

const RouteConfigHelpers = { };

export default RouteConfigHelpers;
export { menuComponent, NoMenuComponent };
