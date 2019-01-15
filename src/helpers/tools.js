/**
 * Returns a formatted number with different number of decimals.
 *
 * @param number number to be transformed
 * @param decimal number of decimals you want to show
 * @param hasThousandSeparator boolean in case you want to show thousand separator.
 * @return {string}
 * */
const formatNumber = (number, decimal = 2, hasThousandSeparator = true) => {
  if (hasThousandSeparator && number > 999.99) {
    return (
      parseFloat(Math.round(number * 100) / 100)
        .toFixed(decimal)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  return parseFloat(Math.round(number * 100) / 100).toFixed(decimal);
};

/**
 * Sets time out with async/await features (useful for testing mutations)
 * @param ms: milliseconds to be waited
 * @return {Promise<any>}
 * */
const wait = ms => new Promise(r => setTimeout(r, ms));

export {
  formatNumber,
  wait,
};
