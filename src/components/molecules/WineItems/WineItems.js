import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ADD_WINE_TO_SUBSCRIPTION } from '../../../graphql/mutations';
import { GET_SHOPPING_CART } from '../../../graphql/queries';
import urlPatterns from '../../../urls';
import { AddWineToShoppingCartButton, ButtonMutation } from '../..';
import { DEFAULT_BOTTLE_URL } from '../../../helpers/constants';

import './WineItems.scss';

/**
 * Renders WineItems component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineItems extends Component {
  state = {
    showNotification: false,
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    isWineSubscriptionBox: PropTypes.bool,
  };

  static defaultProps = {
    data: null,
    isWineSubscriptionBox: false,
  };

  /**
   * Renders wine item details
   * @param {Object} wine - product to be shown in listing
   * @return {React.Component}
   * */
  renderWineItem = wine => {
    const { isWineSubscriptionBox } = this.props;
    const { showNotification } = this.state;
    const memberId = parseInt(window.localStorage.getItem('memberId'), 10);

    // Gets wine's photo URL or sets the default one if it doesn't exist
    const photoUrl = wine.product.productPhotos.length
      ? wine.product.productPhotos[0].photoWineListing
      : DEFAULT_BOTTLE_URL;

    return (
      <div
        key={wine.id}
      >
        {showNotification && this.renderNotification()}
        <Link to={urlPatterns.WINE_DETAILS(wine.product.slug)}>
          <div className="WineItems--image">
            <img src={photoUrl} alt="" />
          </div>
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
        {

          // Renders different buttons depending on the page the user is visiting
          isWineSubscriptionBox
            ? (

              // Adds the wine to subscription
              <ButtonMutation
                label="Add"
                mutationProp={ADD_WINE_TO_SUBSCRIPTION}
                reFetchQueriesProp={[{ query: GET_SHOPPING_CART }]}
                input={{ wineId: wine.id, memberId }}
              />)

            // Adds the wine to the shopping cart as one-off purchase
            : (<AddWineToShoppingCartButton wine={wine} />)
        }
      </div>
    );
  };

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
