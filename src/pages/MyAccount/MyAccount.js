import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { GET_MEMBER } from '../../graphql/queries';
import { ShippingAddressForm } from '../../components';

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
        <div className="MyAccount--container">
          <h1 className="MyAccount--forms_title">My Account</h1>
          <Query query={GET_MEMBER} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              console.log('data from HOC:', data);
              if (data.me) {
                return (
                  <div className="MyAccount--forms_form">
                    <ShippingAddressForm query={data.me} />
                  </div>
                );
              }
              return null;
            }}
          </Query>
          <div className="MyAccount--forms_social">
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
