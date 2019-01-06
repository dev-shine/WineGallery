import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Home, PasswordReset, SetNewPassword, SignUp,
} from './pages';
import { isLoggedIn } from './helpers/auth';

// Declares lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy
const Wines = React.lazy(() => import('./pages/Wines/Wines'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const MyAccount = React.lazy(() => import('./pages/MyAccount/MyAccount'));
const Quiz = React.lazy(() => import('./pages/Quiz/Quiz'));
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));

/**
 * Protects routes (pages) that require login to be visualized, as example My Account page
 * @param ChildComponent
 * @param rest
 * @return {React.Component}: stateless component
 * */
const PrivateRoute = ({ component: ChildComponent, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn() ? (<ChildComponent {...props} />) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    ))
    }
  />);

/**
 * Stores routing management, this is where we map url path and pages (component container)
 * */
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
        <Route path="/set-new-password/:uid/:token" component={SetNewPassword} />

        {/* Renders lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy */}
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/wines" render={() => <Wines />} />
        <Route path="/quiz" render={() => <Quiz />} />
        <Route path="/checkout" render={() => <Checkout />} />

        <PrivateRoute path="/my-account" component={MyAccount} />

      </Switch>
    );
  }
}

export default Routes;
