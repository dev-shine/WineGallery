const EMPTY_PARAM_DATA = {
  params: null,
  data: null,
  responseType: null,
};

const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

const WINE_SORTER = {
  COLOUR: 'Colour',
  NEWEST: 'Newest arrivals',
  WINE_BODY_ASC: 'Body: Low to high',
  WINE_BODY_DESC: 'Body: High to low',
  WINE_TYPE_ASC: 'Grape Name: A to Z',
  WINE_TYPE_DESC: 'Grape Name: Z to A',
  WINE_PRICE_POINT_ASC: 'Price: low to high',
  WINE_PRICE_POINT_DESC: 'Price: high to low',
};

const AU_STATES = new Map([
  ['ACT', 'ACT'],
  ['NSW', 'NSW'],
  ['NT', 'NT'],
  ['QLD', 'QLD'],
  ['SA', 'SA'],
  ['TAS', 'TAS'],
  ['VIC', 'VIC'],
  ['WA', 'WA'],
]);

const CONTACT_TYPE_ID_TO_ENUM = new Map([
  [1, 'WINE_SELECTION'],
  [2, 'DELIVERY'],
  [3, 'BADGE'],
  [4, 'SOCIAL'],
  [5, 'NEWSLETTER'],
]);

const CONTACT_METHOD_ID_TO_ENUM = new Map([
  [1, 'EMAIL'],
  [2, 'SMS'],
]);

const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  SKIP: 'SKIP',
  PAUSE: 'PAUSE',
  EXPIRED: 'EXPIRED',
  NEVER_ACTIVATED: 'NEVER_ACTIVATED',
  CANCELLED: 'CANCELLED',
};

const SUBSCRIPTION_STATUS_ID_TO_NAME = {
  1: 'NEVER_ACTIVATED',
  2: 'ACTIVE',
  3: 'EXPIRED',
  4: 'CANCELLED',
  5: 'SKIP',
  6: 'PAUSE',
};

const SUBSCRIPTION_STATUS_NAME_TO_ID = {
  NEVER_ACTIVATED: 1,
  ACTIVE: 2,
  EXPIRED: 3,
  CANCELLED: 4,
  SKIP: 5,
  PAUSE: 6,
};

const MONTH_NAMES = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const DEFAULT_BOTTLE_URL = (
  `${process.env.REACT_APP_STATIC_URL}/site/img/default-bottle-photo.png`
);

const ADDRESS_UNAVAILABLE_IDS = new Map([
  [1, 'If not home, deliver to local Post Office'],
  [2, 'Authority to leave - under shelter in the shade'],
  [3, 'Authority to leave - near the front door'],
  [4, 'Authority to leave unattended'],
  [5, 'Other (Specify)'],
  [6, 'Signature required'],
  [7, 'Leave at reception during work hours'],
  [8, 'Authority to Leave - On porch/verandah/patio'],
]);

const PRODUCT_TYPE_IDS = {
  DB_ID_PRODUCT_TYPE_WINE: 1,
  DB_ID_PRODUCT_TYPE_GIFT: 2,
  DB_ID_PRODUCT_TYPE_SPECIAL_PACK: 3,
  DB_ID_PRODUCT_TYPE_SUBSCRIPTION_PRE_PAID: 4,
  DB_ID_PRODUCT_TYPE_SHIPPING_PRE_PAID: 5,
  DB_ID_PRODUCT_TYPE_SUBSCRIPTION: 6,
};

const WINE_CLASS_IDS = {
  DB_ID_WINE_CLASS_RED: 1,
  DB_ID_WINE_CLASS_WHITE: 2,
  DB_ID_WINE_CLASS_SPECIAL: 3,
  DB_ID_WINE_CLASS_ROSE: 4,
  DB_ID_WINE_CLASS_SPARKLING: 5,
};

const WINE_PRICE_POINT_IDS = {
  DB_ID_WINE_PRICE_POINT_1: 1,
  DB_ID_WINE_PRICE_POINT_2: 2,
  DB_ID_WINE_PRICE_POINT_3: 3,
  DB_ID_WINE_PRICE_POINT_4: 4,
};

const DISCOUNT_TYPE_IDS = {
  DB_ID_DISCOUNT_TYPE_REFERRAL: 3,
  DB_ID_DISCOUNT_TYPE_GIVEAWAY: 4,
};

const DISCOUNT_TYPE_VALUES = {
  DB_ID_DISCOUNT_TYPE_REFERRAL: 23,
  DB_ID_DISCOUNT_TYPE_GIVEAWAY: 69,
};

const BADGE_CATEGORY_ID = {
  1: 'Special Badges',
  2: 'Wine Passport',
  3: 'Wine Type Checklist',
  4: 'Wine Region Checklist',
  5: 'Wine Production Method Checklist',
};

const AUSTRALIA_CODE = 117;

const SOCIAL_MEDIA_SITES = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  FACEBOOK_MESSENGER: 'facebook-messenger',
};

const DB_IDS_QUIZ_VERSION = {
  SIMPLE_QUIZ: 1,
  ADVANCED_QUIZ: 2,
};

const DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY = {
  SIMPLE_QUIZ: {
    ALL_REDS: 57,
    ALL_WHITES: 58,
    ALL_ROSES: 59,
    ALL_SPARKLINGS: 60,
    MIXED: 61,
  },
  ADVANCED_QUIZ: {
    ALL_REDS: 125,
    ALL_WHITES: 126,
    ALL_ROSES: 127,
    ALL_SPARKLINGS: 128,
    MIXED: 129,
  },
};

const DB_IDS_QUIZ_ANSWER_WITH_VERSION = {
  SIMPLE_QUIZ: {
    BEGINNER: 28,
    REGULAR: 29,
    ADVANCED: 30,
  },
  ADVANCED_QUIZ: {
    BEGINNER: 70,
    REGULAR: 71,
    ADVANCED: 72,
  },
};

const DB_IDS_QUIZ_QUESTION_WITH_VERSION = {
  SIMPLE_QUIZ: 11,
  ADVANCED_QUIZ: 23,
};

const DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY = {
  SIMPLE_QUIZ: 19,
  ADVANCED_QUIZ: 34,
};

const FETCH_POLICY_NO_CACHE = 'no-cache';
const FETCH_POLICY_NETWORK_ONLY = 'network-only';
const FETCH_POLICY_CACHE_FIRST = 'cache-first';
const FETCH_POLICY_CACHE_AND_NETWORK = 'cache-and-network';
const FETCH_POLICY_CACHE_ONLY = 'cache-only';

export {
  AU_STATES,
  BADGE_CATEGORY_ID,
  DEFAULT_BOTTLE_URL,
  HTTP_METHODS,
  CONTACT_TYPE_ID_TO_ENUM,
  CONTACT_METHOD_ID_TO_ENUM,
  DISCOUNT_TYPE_IDS,
  DISCOUNT_TYPE_VALUES,
  SUBSCRIPTION_STATUS_ID_TO_NAME,
  SUBSCRIPTION_STATUS_NAME_TO_ID,
  EMPTY_PARAM_DATA,
  WINE_SORTER,
  SUBSCRIPTION_STATUS,
  MONTH_NAMES,
  ADDRESS_UNAVAILABLE_IDS,
  AUSTRALIA_CODE,
  PRODUCT_TYPE_IDS,
  WINE_CLASS_IDS,
  WINE_PRICE_POINT_IDS,
  FETCH_POLICY_CACHE_AND_NETWORK,
  FETCH_POLICY_NETWORK_ONLY,
  FETCH_POLICY_NO_CACHE,
  FETCH_POLICY_CACHE_FIRST,
  FETCH_POLICY_CACHE_ONLY,
  SOCIAL_MEDIA_SITES,
  DB_IDS_QUIZ_VERSION,
  DB_IDS_QUIZ_ANSWER_WITH_VERSION,
  DB_IDS_QUIZ_QUESTION_WITH_VERSION,
  DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY,
  DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY,
};
