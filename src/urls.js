const URL_PATTERNS = {
  BASE: '/',
  CHECKOUT: '/checkout',
  DASHBOARD_BADGES: '/dashboard/badges',
  HOME: '/home',
  LOGIN: '/login',
  MY_ACCOUNT: '/my-account',
  MY_ORDERS: '/dashboard/orders',
  DASHBOARD: '/dashboard',
  PASSWORD_RESET: '/password-reset',
  QUIZ: '/quiz',
  QUIZ_RESULTS: '/quiz/results',
  REFERRAL: (referralCode = ':referralCode') => `/invite/${referralCode}`,
  SET_NEW_PASSWORD: '/set-new-password/:uid/:token',
  SIGN_UP: '/signup',
  SPECIAL_PACKS: '/special-packs',
  SPECIAL_PACK_DETAILS: (slug = ':slug') => `/special-packs/details/${slug}`,
  THANK_YOU: '/checkout-thank-you',
  WINES: '/wines',
  WINES_BOX: '/my-wine-box',
  RATINGS: '/ratings',
  WINE_DETAILS: (slug = ':slug') => `/wines/details/${slug}`,
  GIFTS: '/gifts',
  INVITE_FRIEND: '/dashboard/invite',
  GIVE_FREE_TRIAL: '/dashboard/give',
};

export default URL_PATTERNS;
