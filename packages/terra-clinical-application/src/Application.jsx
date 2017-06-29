import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Base from 'terra-base';
import AppDelegate from 'terra-app-delegate';
import 'terra-base/lib/baseStyles';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import './Application.scss';

const propTypes = {
  /**
   * The AppDelegate instance that will be propagated to the Application's children.
   **/
  app: AppDelegate.propType,
  /**
   * The components to display within the Application.
   **/
  children: PropTypes.node.isRequired,
  /**
   * The components to display within the Application.
   **/
  reducers: PropTypes.array,
};

const Application = ({ app, children, reducers, ...customProps }) => {
  let childrenToRender = children;

  if (app) {
    childrenToRender = React.Children.map(children, child => (
      React.cloneElement(child, { app })
    ));
  }

  const base = (
    <Base {...customProps} className={classNames([customProps.className, 'terraClinical-Application'])}>
      {childrenToRender}
    </Base>
  );

  if (reducers && reducers.length) {
    return (
      <Provider store={createStore(combineReducers(Object.assign({}, ...reducers)))}>
        {base}
      </Provider>
    );
  } else {
    return base;
  }
};

Application.propTypes = propTypes;

export default Application;
