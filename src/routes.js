import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, PasswordReset, SignUp } from './pages';

// Declares lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy
const Wines = React.lazy(() => import('./pages/Wines/Wines'));
const Login = React.lazy(() => import('./pages/Login/Login'));

class Routes extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {}

  render() {
    return (
      <Switch>

        {/* Renders components once application is loaded first time */}
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/password-reset" component={PasswordReset} />

        {/* Renders lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy */}
        <Route path="/login" render={() => <Login />} />
        <Route path="/wines" render={() => <Wines />} />
      </Switch>
    );
  }
}

export default Routes;
