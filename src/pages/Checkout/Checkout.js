import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { CheckoutShippingAddressForm } from '../../components';

import './Checkout.scss';
import { GET_MEMBER } from '../../graphql/queries';

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
        <div className="Checkout--container">
          <h1 className="Checkout--forms_title">My Account</h1>
          <Query query={GET_MEMBER} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              if (data.me) {
                return (
                  <div className="Checkout--forms_shipping">
                    <CheckoutShippingAddressForm query={data.me} />
                  </div>
                );
              }
              return <div>Ooops, this is embarrassing... Something went wrong, try to reload your page.</div>;
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Checkout;
