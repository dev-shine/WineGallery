import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { isLoggedIn } from '../../../helpers/auth';
import { saveCartItemToLocalStorage } from '../../../helpers/tools';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { ADD_SHOPPING_CART_ITEM } from '../../../graphql/mutations';

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
   * Adds items to shopping cart
   * If user IS logged in, adds item to database's shopping cart
   * If user IS NOT logged in, adds item to browser local storage's shopping cart
   * @param {Object} wine - product to be added
   * @param {Function} addShoppingCartItem - GraphQL mutation to add item to shopping cart
   * @return {Promise<void>}
   * */
  handleAddItemToShoppingCart = async (wine, addShoppingCartItem) => {
    if (isLoggedIn()) {
      const memberId = window.localStorage.getItem('memberId');

      if (!memberId) {
        console.error('User is logged in, but does not have a memberId in local storage.');
      } else {

        //  Saves wine to shopping cart database in case user is logged in
        addShoppingCartItem({
          variables: {
            input: {
              memberId: parseInt(memberId, 10),
              productId: parseInt(wine.product.id, 10),
              quantity: 1,
            },
          },
        }).then(() => {
          window.showShoppingCart();
        });
      }
    } else {

      //  Saves wine item to shopping cart in browser session in case user is not logged in
      const shoppingCartItem = {
        quantity: 1,
        product: {
          id: parseInt(wine.product.id, 10),
          name: wine.product.name,
          sellingPrice: wine.product.sellingPrice,
        },
      };
      await saveCartItemToLocalStorage(shoppingCartItem, true, false, false).then(() => {

        // TODO DEV-203: bind shopping cart counter to apollo-link-state variable
        window.shoppingCartRefresh();
        window.showShoppingCart();
      });

    }
  };

  /**
   * Renders wine item details
   * @param {Object} wine - product to be shown in listing
   * @return {React.Component}
   * */
  renderWineItem = wine => (
    <Mutation
      mutation={ADD_SHOPPING_CART_ITEM}
      key={`winesItems${wine.id}`}
      refetchQueries={() => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }]}
    >
      {addShoppingCartItem => (
        <div
          role="button"
          tabIndex="0"
          onKeyPress={() => this.handleAddItemToShoppingCart(wine, addShoppingCartItem)}
          onClick={() => this.handleAddItemToShoppingCart(wine, addShoppingCartItem)}
        >
          {wine.product.name}
          <br />
          {wine.wineType.wineClass.name}
          |
          {wine.wineType.name}
          <br />
          {wine.country.name}
          |
          {wine.year}
        </div>
      )}
    </Mutation>
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
