import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { CheckoutShippingAddressForm, DiscountCodeForm, OrderSummary } from '../../components';
import { GET_MEMBER } from '../../graphql/queries';

import './Checkout.scss';

/**
 * Renders Checkout component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Checkout extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <div className="Checkout">
        <Query query={GET_MEMBER} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (data.me) {
              return (
                <div className="Checkout--container">
                  <h1 className="Checkout--forms__title">My Account</h1>

                  <div className="Checkout--forms__shipping">
                    <CheckoutShippingAddressForm query={data.me} />
                  </div>
                  <div className="Checkout--forms__summary">
                    <OrderSummary query={data.me} />
                  </div>
                  <div className="Checkout--forms__discount-code">
                    <DiscountCodeForm query={data.me} />
                  </div>
                </div>
              );
            }
            return <div>Ooops, this is embarrassing... Something went wrong, try to reload your page.</div>;
          }}
        </Query>
      </div>
    );
  }
}

export default Checkout;
