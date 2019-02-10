import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { executeLogInRequest, getLocalStorageToken } from '../../helpers/auth';
import urlPatterns from '../../urls';
import { InputField } from '../../components';

import './Login.scss';

/**
 * Renders LogIn component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Login extends Component {
  state = {
    form: {
      email: '',
      password: '',
      error: null,
    },
    auth: {
      accessToken: '',
      refreshToken: '',
      encodedTokens: localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE) || '',
    },
  };

  async componentDidMount() {
    const { state } = this;

    // Decodes tokens from localStorage --> https://www.npmjs.com/package/jsonwebtoken
    const jwToken = state.auth.encodedTokens && getLocalStorageToken();

    if (jwToken) {
      this.setState({
        form: {
          email: jwToken.email,
        },
        auth: {
          ...state.auth,
          accessToken: jwToken.accessToken,
          refreshToken: jwToken.refreshToken,
        },
      });
    }
  }

  /**
   * Assigns new values to 'this.state.form' properties
   * @param field
   * @param value
   * */
  handleChange = (field, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [field]: value } });
  };

  /**
   * Executes login and redirects to my account page if login successful
   * */
  handleSubmit = async () => {
    const { state } = this;
    const { email, password } = state.form;

    // Removes local storage if is already set
    if (localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE)) {
      localStorage.removeItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);
    }

    // Executes Login and redirects user to MyAccount page
    executeLogInRequest(email, password)
      .then(() => {

        // Redirects to my account page
        window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.MY_ACCOUNT}`;
      })

      // Catches error from server (if login unsuccessful) and show message in the form
      .catch(error => {

        // Stores error from server's response in state variables
        this.setState({
          form: {
            ...state.form,
            error: {
              errorStatus: error,
              errorDescription: error.response.data.error_description,
            },
          },
        });
      });
  };

  render() {
    const { state } = this;
    const { email, password, error } = state.form;

    return (
      <div className="Login">
        <div className="Login--container">
          <h1 className="Login--forms__title">SignUp</h1>
          <div className="Login--forms__form">
            <h2>Login Form</h2>
            <InputField
              label="Email"
              placeholder="Email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            <InputField
              label="Password"
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
            <Link to="/password-reset">Forgot your password?</Link>
            <button type="button" onClick={this.handleSubmit}>Login</button>
            {error && error.errorDescription && <div>{error.errorDescription}</div>}
          </div>
          <div className="Login--forms__social">
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
