import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Home, PasswordReset, SetNewPassword, SignUp, Quiz, QuizResults,
} from './pages';
import urlPatterns from './urls';
import { isLoggedIn } from './helpers/auth';

// Declares lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy
const Wines = React.lazy(() => import('./pages/Wines/Wines'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const MyAccount = React.lazy(() => import('./pages/MyAccount/MyAccount'));
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
        <Route path={urlPatterns.HOME} exact component={Home} />
        <Route path={urlPatterns.HOME} exact component={Home} />
        <Route path={urlPatterns.SIGN_UP} component={SignUp} />
        <Route path={urlPatterns.PASSWORD_RESET} component={PasswordReset} />
        <Route path={urlPatterns.SET_NEW_PASSWORD} component={SetNewPassword} />
        <Route path={urlPatterns.QUIZ} exact component={Quiz} />
        <Route path={urlPatterns.QUIZ_RESULTS} exact component={QuizResults} />

        {/* Renders lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy */}
        <Route path={urlPatterns.LOGIN} render={props => <Login {...props} />} />
        <Route path={urlPatterns.WINES} render={() => <Wines />} />
        <Route path={urlPatterns.CHECKOUT} render={() => <Checkout />} />

        <PrivateRoute path={urlPatterns.MY_ACCOUNT} component={MyAccount} />

      </Switch>
    );
  }
}

export default Routes;
