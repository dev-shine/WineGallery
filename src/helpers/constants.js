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

const WINE_SORTER = {
  COLOUR: 'Colour',
  NEWEST: 'Newest arrivals',
  WINE_BODY_ASC: 'Body: Low to high',
  WINE_BODY_DESC: 'Body: High to low',
  WINE_TYPE_ASC: 'Grape Name: A to Z',
  WINE_TYPE_DESC: 'Grape Name: Z to A',
};

export {
  HTTP_METHODS,
  EMPTY_PARAM_DATA,
  AU_STATES,
  WINE_SORTER,
};
