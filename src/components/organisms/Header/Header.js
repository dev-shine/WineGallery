import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ShoppingCart } from '../..';
import { isLoggedIn } from '../../../helpers/auth';
import urlPatterns from '../../../urls';

import logo from '../../../assets/images/logo.svg';
import './Header.scss';

/**
 * Renders main header for the application.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Header extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {}

  render() {
    return (
      <div className="Header">
        <div className="Header--container">
          <section className="Header--brand">
            <Link to="/home">
              <img src={logo} className="Header--brand__logo" alt="The Wine Gallery" />
            </Link>
          </section>
          <nav className="Header--main-navigation">
            <ul className="Header--main-navigation--list">
              <li>
                <NavLink to={urlPatterns.HOME}>Home</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.QUIZ}>Quiz</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.WINES}>Wines</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.SPECIAL_PACKS}>Special Boxes</NavLink>
              </li>
              {
                !isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.SIGN_UP}>SignUp</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.WINES_BOX}>My Wine Box</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.MY_ACCOUNT}>My Account</NavLink>
                  </li>
                )
              }
              <li>
                <NavLink to={urlPatterns.LOGIN}>{isLoggedIn() ? 'Logout' : 'Login'}</NavLink>
              </li>
              <li>
                <ShoppingCart />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
