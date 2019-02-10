import jwt from 'jsonwebtoken';
import { HTTP_METHODS } from './constants';
import executeRestApi from './rest';

const localStorageContent = localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);

/**
 * Gets auth information to browser local storage and decodes information
 * @return {Object}
 * */
const getLocalStorageToken = () => {

  // Creates token object with null properties in case of error or `localStorage` is undefined
  const tokenObjectNull = { accessToken: null, refreshToken: null, email: null };

  let tokenObject = jwt.verify(
    localStorageContent, process.env.REACT_APP_AUTH_DECODE, (error, decode) => {
      try {
        return decode;
      } catch (e) {

        // Logs error
        error && console.error('error', error);
        e && console.error('e', e);
        return tokenObjectNull;
      }
    }
  );

  // Assigns token object with null properties in case it is `undefined`
  if (!tokenObject) tokenObject = tokenObjectNull;

  return tokenObject;
};

/**
 * Sets encoded auth information to browser local storage
 * @param {string} accessToken
 * @param {string} refreshToken
 * @param {string} email
 * */
const setLocalStorageToken = (accessToken, refreshToken, email) => {
  localStorage.setItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE, jwt.sign(
    {
      accessToken,
      refreshToken,
      email,
    },
    `${process.env.REACT_APP_AUTH_DECODE}`
  ));
};

/**
 * Checks if the browser has session stored in local storage
 * @return {boolean}
 * */
const isLoggedIn = () => {

  // TODO: add a check to expired tokens
  const localStorageTokenObject = getLocalStorageToken();
  return Boolean(localStorageContent && localStorageTokenObject);
};

/**
 * Executes Login api request and save token details
 * @param {string} email
 * @param {string} password
 * @return {Promise<void>}
 * */
const executeLogInRequest = async (email, password) => {

  // Creates arguments to pass into Login API request
  const urlPath = `${process.env.REACT_APP_REST_AUTH_PATH}`;
  const data = {
    password,
    username: email,
    grant_type: 'password',
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
  };

  // Logs user in, if sign up is successful
  return executeRestApi(HTTP_METHODS.POST, urlPath, { data })

  // Stores response from request in local storage and redirects to my account page
    .then(response => {

      // Encodes and Stores tokens in localStorage --> https://www.npmjs.com/package/jsonwebtoken
      setLocalStorageToken(
        response.data.access_token,
        response.data.refresh_token,
        email
      );
      return response;
    });
};

export {
  executeLogInRequest,
  getLocalStorageToken,
  setLocalStorageToken,
  isLoggedIn,
};
