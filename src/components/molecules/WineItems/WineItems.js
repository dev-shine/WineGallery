import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import urlPatterns from '../../../urls';
import { AddWineToShoppingCartButton } from '../..';

import './WineItems.scss';

/**
 * Renders WineItems component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineItems extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    data: null,
  };

  /**
   * Renders wine item details
   * @param {Object} wine - product to be shown in listing
   * @return {React.Component}
   * */
  renderWineItem = wine => (
    <div
      key={wine.id}
    >
      <Link to={urlPatterns.WINE_DETAILS(wine.product.slug)}>
        {wine.product.name}
        <br />
        {wine.wineType.wineClass.name}
        |
        {wine.wineType.name}
        <br />
        {wine.country.name}
        |
        {wine.year}
      </Link>
      <AddWineToShoppingCartButton wine={wine} />
    </div>
  );

  render() {
    const { data } = this.props;
    return (
      <div
        className="WineItems"
      >
        <div>
          {data.map(wine => (
            this.renderWineItem(wine)
          ))}
        </div>
      </div>
    );
  }
}

export default WineItems;
