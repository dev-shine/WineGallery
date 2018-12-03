import React, { Component } from 'react';

import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';

import './Header.scss';

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
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/password-reset">Forgot my password...</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
