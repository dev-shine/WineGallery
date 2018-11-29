import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, PasswordReset, SignUp } from './pages';

const Wines = React.lazy(
  () => import('./pages/Wines/Wines')
);

const Login = React.lazy(
  () => import('./pages/Login/Login')
);

class Routes extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {
  }

  render() {

    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/password-reset' component={PasswordReset} />
        <Route path='/wines' component={Wines} />
      </Switch>
    );
  }
}

export default Routes;
