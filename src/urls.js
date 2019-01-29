const URL_PATTERNS = {
  BASE: '/',
  CHECKOUT: '/checkout',
  HOME: '/home',
  LOGIN: '/login',
  MY_ACCOUNT: '/my-account',
  PASSWORD_RESET: '/password-reset',
  QUIZ: '/quiz',
  QUIZ_RESULTS: '/quiz/results',
  SET_NEW_PASSWORD: '/set-new-password/:uid/:token',
  SIGN_UP: '/signup',
  WINE_DETAILS: (slug = ':slug') => `/wines/details/${slug}`,
  WINES: '/wines',
  WINES_BOX: '/my-wine-box',
  THANK_YOU: '/checkout-thank-you',
};

export default URL_PATTERNS;
