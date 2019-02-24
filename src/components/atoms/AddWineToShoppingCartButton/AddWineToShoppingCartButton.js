import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { compose, graphql, Mutation } from 'react-apollo';
import { GET_AUTH } from '../../../graphql/resolvers/auth';

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
    quantity: PropTypes.number,
    label: PropTypes.string,
    authQuery: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    quantity: 1,
    label: 'Add',
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
    const { quantity, authQuery } = this.props;

    if (isLoggedIn()) {
      const memberId = authQuery.auth && authQuery.auth.memberId;
      if (!memberId) {
        console.error('User is logged in, but does not have a memberId in local storage.');
      } else {

        //  Saves wine to shopping cart database in case user is logged in
        addShoppingCartItem({
          variables: {
            input: {
              memberId,
              productId: wine.product.id,
              quantity,
            },
          },
        }).then(() => {
          window.showShoppingCart();
        });
      }
    } else {

      //  Saves wine item to shopping cart in browser session in case user is not logged in
      const shoppingCartItem = {
        quantity,
        product: {
          id: wine.product.id,
          name: wine.product.name,
          sellingPrice: wine.product.sellingPrice,
          productType: {
            id: wine.product.productType.id,
          },
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
    const { wine, label } = this.props;

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
              {label}
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery' }),
)(AddWineToShoppingCartButton);
