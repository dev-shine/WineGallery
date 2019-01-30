import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { isLoggedIn } from '../../../helpers/auth';
import { saveCartItemToLocalStorage } from '../../../helpers/tools';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { ADD_SHOPPING_CART_ITEM } from '../../../graphql/mutations';

import './AddWineToShoppingCartButton.scss';

/**
 * Renders AddWineToShoppingCartButton component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class AddWineToShoppingCartButton extends Component {
  static propTypes = {
    wine: PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
  };

  static defaultProps = {};

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
      // TODO: [DEV-203] get Member ID from apollo-link-state
      const memberId = window.localStorage.getItem('memberId');

      if (!memberId) {
        console.error('User is logged in, but does not have a memberId in local storage.');
      } else {

        //  Saves wine to shopping cart database in case user is logged in
        addShoppingCartItem({
          variables: {
            input: {
              memberId,
              productId: wine.product.id,
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
          id: wine.product.id,
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

  render() {
    const { wine } = this.props;

    return (
      <div className="AddWineToShoppingCartButton">
        <Mutation
          mutation={ADD_SHOPPING_CART_ITEM}
          refetchQueries={() => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }]}
        >
          {addShoppingCartItem => (
            <button
              type="button"
              onClick={() => this.handleAddItemToShoppingCart(wine, addShoppingCartItem)}
            >
              add
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default AddWineToShoppingCartButton;
