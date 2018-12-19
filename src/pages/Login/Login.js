import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { HTTP_METHODS } from '../../helpers/constants';
import executeRestApi from '../../helpers/rest';
import { getLocalStorageToken, setLocalStorageToken } from '../../helpers/auth';

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

  componentDidMount() {
    const { state } = this;

    // Logs user out from application once they land back in to Login page
    if (localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE)) {
      localStorage.removeItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);

      // Ensures user is logged out
      // TODO: remove this when we introduce local state from Apollo
      window.location = `${process.env.REACT_APP_BASE_URL}/login`;
    }

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
  handleSubmit = () => {
    const { state } = this;
    const { email, password } = state.form;

    // Removes local storage if is already set
    if (localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE)) {
      localStorage.removeItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);
    }

    // Creates arguments to pass into API request
    const urlPath = `${process.env.REACT_APP_TWG_REST_AUTH_PATH}`;
    const data = {
      password,
      username: email,
      grant_type: 'password',
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    };

    // Sends request to axiosJs instance
    executeRestApi(HTTP_METHODS.POST, urlPath, { data })

    // Stores response from previous statement in local storage and redirects to my account page
      .then(response => {

        // Encodes and Stores tokens in localStorage --> https://www.npmjs.com/package/jsonwebtoken
        setLocalStorageToken(response, email);

        // Redirects to my account page
        // TODO: change this to this.props.history.push() when we introduce local state from Apollo
        window.location = `${process.env.REACT_APP_BASE_URL}/my-account`;
      })

      // Catches error from server (if login unsuccessful) and show message in the form
      .catch(error => {

        // Stores error from server's response in state variables
        this.setState({
          form: {
            ...state.form,
            error: {
              errorStatus: error.response.status,
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
          <h1 className="Login--forms_title">SignUp</h1>
          <div className="Login--forms_form">
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
          <div className="Login--forms_social">
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
