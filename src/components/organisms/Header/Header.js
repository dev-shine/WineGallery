import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { isLoggedIn } from '../../../helpers/auth';

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
              <img src={logo} className="Header--brand_logo" alt="The Wine Gallery" />
            </Link>
          </section>
          <nav className="Header--main-navigation">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/wines">Wines</NavLink>
              </li>
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/login">{isLoggedIn() ? 'Logout' : 'Login'}</NavLink>
              </li>
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to="/my-account">My Account</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to="/checkout">Checkout</NavLink>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
