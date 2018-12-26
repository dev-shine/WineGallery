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
  ['1', 'WINE_SELECTION'],
  ['2', 'DELIVERY'],
  ['3', 'BADGE'],
  ['4', 'SOCIAL'],
  ['5', 'NEWSLETTER'],
]);

const CONTACT_METHOD_ID_TO_ENUM = new Map([
  ['1', 'EMAIL'],
  ['2', 'SMS'],
]);

export {
  AU_STATES,
  HTTP_METHODS,
  CONTACT_TYPE_ID_TO_ENUM,
  CONTACT_METHOD_ID_TO_ENUM,
  EMPTY_PARAM_DATA,
  WINE_SORTER,
};
