import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { GET_MEMBER } from '../../graphql/queries';
import { AccountDetailsForm, ShippingAddressForm } from '../../components';

import './MyAccount.scss';

/**
 * Renders MyAccount component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class MyAccount extends Component {
  static contextTypes = {};

  state = {};

  render() {
    return (
      <div className="MyAccount">
        <Query query={GET_MEMBER} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (data.me) {
              return (
                <div className="MyAccount--container">
                  <h1 className="MyAccount--forms_title">My Account</h1>
                  <div className="MyAccount--forms_account">
                    <AccountDetailsForm query={data.me} />
                  </div>
                  <div className="MyAccount--forms_shipping">
                    <ShippingAddressForm query={data.me} />
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

export default MyAccount;
