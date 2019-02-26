import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Home, PasswordReset, SetNewPassword, SignUp, Quiz, QuizResults, SpecialPacks, SpecialPackDetails,
  WineRatings,
} from './pages';
import ThankYou from './pages/ThankYou/ThankYou';
import urlPatterns from './urls';
import { isLoggedIn } from './helpers/auth';

// Declares lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy
const Wines = React.lazy(() => import('./pages/Wines/Wines'));
const WineDetails = React.lazy(() => import('./pages/WineDetails/WineDetails'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const MyAccount = React.lazy(() => import('./pages/MyAccount/MyAccount'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
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
        <Route path={urlPatterns.WINES} exact render={props => <Wines {...props} />} />
        <Route
          path={urlPatterns.WINES_BOX}
          exact
          render={props => <Wines {...props} isWineSubscriptionBox />}
        />
        <Route path={urlPatterns.WINE_DETAILS()} render={props => <WineDetails {...props} />} />
        <Route path={urlPatterns.CHECKOUT} render={props => <Checkout {...props} />} />
        <Route path={urlPatterns.THANK_YOU} render={props => <ThankYou {...props} />} />
        <Route path={urlPatterns.SPECIAL_PACKS} exact render={props => <SpecialPacks {...props} />} />
        <Route
          path={urlPatterns.SPECIAL_PACK_DETAILS()}
          render={props => <SpecialPackDetails {...props} />}
          exact
        />

        <PrivateRoute path={urlPatterns.MY_ACCOUNT} component={MyAccount} />
        <PrivateRoute path={urlPatterns.DASHBOARD} component={Dashboard} />
        <PrivateRoute path={urlPatterns.RATINGS} component={WineRatings} />

        <Route path="" exact component={Home} />
      </Switch>
    );
  }
}

export default Routes;
