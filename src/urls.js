const URL_PATTERNS = {
  BASE: '/',
  CHECKOUT: '/checkout',
  DASHBOARD_BADGES: '/', // TODO: [DEV-220] implement "My Badges"
  HOME: '/home',
  LOGIN: '/login',
  MY_ACCOUNT: '/my-account',
  DASHBOARD: '/dashboard',
  PASSWORD_RESET: '/password-reset',
  QUIZ: '/quiz',
  QUIZ_RESULTS: '/quiz/results',
  SET_NEW_PASSWORD: '/set-new-password/:uid/:token',
  SIGN_UP: '/signup',
  SPECIAL_PACKS: '/special-packs',
  SPECIAL_PACK_DETAILS: (slug = ':slug') => `/special-packs/details/${slug}`,
  THANK_YOU: '/checkout-thank-you',
  WINES: '/wines',
  WINES_BOX: '/my-wine-box',
  WINE_DETAILS: (slug = ':slug') => `/wines/details/${slug}`,
};

export default URL_PATTERNS;
