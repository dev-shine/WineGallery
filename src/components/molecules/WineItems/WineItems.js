import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';

import { isLoggedIn } from '../../../helpers/auth';
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

  handleAddItemToShoppingCart = (wine, addShoppingCartItem) => {
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
        });

      }

    } else {

      //  Saves wine item to shopping cart in browser session in case user is not logged in

    }
  };

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
