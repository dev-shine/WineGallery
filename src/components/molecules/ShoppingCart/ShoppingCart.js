import React, { Component } from 'react';

import Modal, { closeStyle } from 'simple-react-modal';
import { Query } from 'react-apollo';
import { DELETE_SHOPPING_CART_ITEM, UPDATE_SHOPPING_CART_ITEM } from '../../../graphql/mutations';

import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { ButtonMutation } from '../..';
import { formatNumber } from '../../../helpers/tools';

import shoppingCartIcon from '../../../assets/images/the-wine-gallery-box-icon.png';
import './ShoppingCart.scss';

/**
 * Renders ShoppingCart component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class ShoppingCart extends Component {
  state = {
    showModal: false,
  };

  /**
   * Renders and calculates badge counter to shopping cart icon
   * @param productsCartArray
   * @return {(React.Component|null)}
   * */
  renderCartCounter = productsCartArray => {
    const totalItems = productsCartArray && productsCartArray
      .map(item => item.quantity)
      .reduce((a, b) => a + b, 0);
    return totalItems >= 1 ? <span className="counter">{totalItems}</span> : null;
  };

  render() {
    const { showModal } = this.state;

    return (
      <Query query={GET_SHOPPING_CART}>
        {({ loading, error, data: { me } }) => {
          if (loading) return '';
          if (error) return `Error! ${error.message}`;
          const hasShoppingCartSet = Boolean(me && me.shoppingCart && me.shoppingCart.shoppingcartitemSet);

          // TODO: Possibly change sorting to back end to improve FE performance
          // Result without this sorting: https://www.useloom.com/share/781edb12b9b84d899b656e6d5bc0c30a
          const productsCartArray = hasShoppingCartSet && me.shoppingCart.shoppingcartitemSet
            .sort((a, b) => a.product.id - b.product.id);

          return (
            <div className="ShoppingCart">
              <button
                type="button"
                onClick={() => this.setState({ showModal: true })}
                className="ShoppingCart--box-icon"
              >
                <img className="icon" src={shoppingCartIcon} alt="Shopping Cart" />
                {hasShoppingCartSet && this.renderCartCounter(productsCartArray)}
              </button>
              <Modal
                style={{ background: 'rgba(0, 0, 0, 0.2)' }}
                containerStyle={{ width: '80%', maxWidth: 600 }}
                show={showModal}
                onClose={() => this.setState({ showModal: false })}
                closeOnOuterClick
                containerClassName="ShoppingCart--modal--container"
              >
                <div className="ShoppingCart--modal--container">
                  <ul className="ShoppingCart--modal--list">
                    {productsCartArray && productsCartArray.map(item => (
                      <li key={item.product.id} className="item">
                        <ButtonMutation
                          input={{ memberId: me.id, productId: item.product.id }}
                          mutationProp={DELETE_SHOPPING_CART_ITEM}
                          reFetchQueriesProp={[{ query: GET_MEMBER }]}
                          label="x"
                        />
                        {
                          `${item.product.name} | $${formatNumber(item.product.sellingPrice)}`
                        }
                        <div className="ShoppingCart--item-quantity">
                          <ButtonMutation
                            input={{
                              memberId: me.id,
                              productId: item.product.id,
                              quantity: (item.quantity - 1),
                            }}
                            mutationProp={UPDATE_SHOPPING_CART_ITEM}
                            reFetchQueriesProp={[{ query: GET_MEMBER }]}
                            label="-"
                          />
                          {item.quantity}
                          <ButtonMutation
                            input={{
                              memberId: me.id,
                              productId: item.product.id,
                              quantity: (item.quantity + 1),
                            }}
                            mutationProp={UPDATE_SHOPPING_CART_ITEM}
                            reFetchQueriesProp={[{ query: GET_MEMBER }]}
                            label="+"
                          />
                        </div>

                      </li>
                    ))}
                  </ul>
                </div>
                <button type="button" style={closeStyle} onClick={() => this.setState({ showModal: false })}>
                  X
                </button>
              </Modal>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ShoppingCart;
