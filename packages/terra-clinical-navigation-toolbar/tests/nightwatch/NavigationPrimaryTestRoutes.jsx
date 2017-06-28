/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import NavigationPrimaryTests from './NavigationPrimaryTests';
import DefaultNavigationPrimary from './DefaultNavigationPrimary';

const routes = (
  <div>
    <Route path="/tests/navigation-primary-tests" component={NavigationPrimaryTests} />
    <Route path="/tests/navigation-primary-tests/default" component={DefaultNavigationPrimary} />
  </div>
);

export default routes;
