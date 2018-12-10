import React, { Component } from 'react';

import { getLocalStorageToken } from '../../helpers/auth';

import './MyAccount.scss';

/**
 * Renders MyAccount component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class MyAccount extends Component {
  static propTypes = {};

  static contextTypes = {};

  state = {
    user: {
      email: '',
    },
    auth: {
      accessToken: '',
      refreshToken: '',
      encodedTokens: localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE) || '',
    },
  };

  componentDidMount() {
    const { state } = this;

    // Decodes tokens from localStorage --> https://www.npmjs.com/package/jsonwebtoken
    const jwToken = state.auth.encodedTokens && getLocalStorageToken();
    if (jwToken) {
      this.setState({
        user: {
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

  render() {
    const { state } = this;
    const { email } = state.user;
    const { accessToken, refreshToken, encodedTokens } = state.auth;

    return (
      <div className="MyAccount">
        <div className="MyAccount--container">
          <h1 className="MyAccount--forms_title">My Account</h1>
          <div className="MyAccount--forms_form">
            <h2>Local Storage Decoded Information</h2>

            <p>{`token: ${accessToken}`}</p>
            <p>{`refresh_token: ${refreshToken}`}</p>
            <p>{`email: ${email}`}</p>
            <p>{`encoded_token: ${encodedTokens}`}</p>
          </div>
          <div className="MyAccount--forms_social">
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
