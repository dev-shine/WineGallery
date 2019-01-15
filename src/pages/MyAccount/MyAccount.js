import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { GET_MEMBER } from '../../graphql/queries';
import {
  AccountDetailsForm,
  ContactPreferencesForm,
  ShippingAddressForm,
  SubscriptionStatus,
  PaymentMethod,
} from '../../components';

import './MyAccount.scss';

/**
 * Renders MyAccount component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class MyAccount extends Component {
  state = {};

  /**
   * Updates shopping cart and memberId from local storage
   * @param memberId
   * */
  handleUpdatesOnLogin = memberId => {

    // TODO DEV-203 replace this once we introduce apollo-link-state
    window.localStorage.setItem('memberId', memberId);
  };

  render() {
    return (
      <div className="MyAccount">
        <Query query={GET_MEMBER} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (data.me) {
              this.handleUpdatesOnLogin(data.me.id);
              return (
                <div className="MyAccount--container">
                  <h1 className="MyAccount--forms__title">My Account</h1>
                  <div className="MyAccount--forms__payment-method">
                    <PaymentMethod query={data.me} />
                  </div>
                  <div className="MyAccount--forms__billing-day">
                    <h3>Billing day place holder.</h3>
                  </div>
                  <div className="MyAccount--forms__subscription">
                    <SubscriptionStatus query={data.me} />
                  </div>
                  <div className="MyAccount--forms__account">
                    <AccountDetailsForm query={data.me} />
                  </div>
                  <div className="MyAccount--forms__shipping">
                    <ShippingAddressForm query={data.me} />
                  </div>
                  <div className="MyAccount--forms__contact-preferences">
                    <ContactPreferencesForm query={data.me.contactpreferenceSet} memberId={data.me.id} />
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
