import jwt from 'jsonwebtoken';

const localStorageContent = localStorage.getItem('shhh');

/**
 * Gets auth information to browser local storage and decodes information
 * */
const getLocalStorageToken = () => jwt.verify(
  localStorageContent, process.env.REACT_APP_AUTH_DECODE, (error, decode) => {
    try {
      return decode;
    } catch (e) {

      // Logs error
      error && console.log('error', error);
      e && console.log('e', e);
      return e;
    }
  }
);

/**
 * Sets encoded auth information to browser local storage
 * @param response
 * @param email
 * */
const setLocalStorageToken = (response, email) => {
  localStorage.setItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE, jwt.sign(
    {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      email,
    },
    `${process.env.REACT_APP_AUTH_DECODE}`
  ));
};

/**
 * Checks if the browser has session stored in local storage
 * @return boolean
 * */
const isLoggedIn = () => {

  // TODO: add a check to expired tokens
  const getLocalStorageInfo = getLocalStorageToken();
  return localStorageContent && getLocalStorageInfo;
};

export {
  getLocalStorageToken,
  setLocalStorageToken,
  isLoggedIn,
};
