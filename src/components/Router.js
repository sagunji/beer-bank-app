import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';

import history from '../utils/history';

import * as routes from '../constants/routes';

import Main from './main';
import Favorites from './favorites';

// Top level application router.
const Router = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route exact path={routes.HOME} component={Main} />
      <Route exact path={routes.FAVORITES} component={Favorites} />
    </Switch>
  </BrowserRouter>
);

export default Router;
