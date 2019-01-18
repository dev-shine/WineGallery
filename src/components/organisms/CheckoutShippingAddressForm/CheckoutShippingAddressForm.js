import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import { GET_MEMBER } from '../../../graphql/queries';
import { UPDATE_CHECKOUT_SHIPPING_ADDRESS } from '../../../graphql/mutations';
import {
  checkAddress,
  checkName,
  checkServerValidation,
  checkState,
} from '../../../helpers/validations';
import { InputField } from '../..';

import './CheckoutShippingAddressForm.scss';

/**
 * Renders CheckoutShippingAddressForm in a react component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class CheckoutShippingAddressForm extends Component {
  static propTypes = {
    query: PropTypes.shape({
      shippingAddress: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        postcode: PropTypes.string,
        company: PropTypes.string,
        contactNumber: PropTypes.string,
        country: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          code: PropTypes.bool,
        }),
        addressUnavailableInstruction: PropTypes.shape({
          id: PropTypes.number,
          nameShort: PropTypes.string,
          authorityToLeave: PropTypes.bool,
        }),
      }),
      email: PropTypes.string,
      id: PropTypes.number,
    }),
  };

  static defaultProps = {
    query: [{}],
  };

  state = {
    shippingAddress: {
      firstName: null,
      lastName: null,
      line1: null,
      line2: null,
      city: null,
      state: null,
      postcode: null,
      company: null,
      contactNumber: null,
      countryId: null,
      addressUnavailableInstructionId: null,
    },
  };

  /**
   *  TODO: [DEV-167] This lifecycle function will be deprecated in future versions of React
   *  Actions: to consider a better design
   *  */
  componentWillMount() {
    const { props } = this;
    if (props.query.shippingAddress) this.handleQueryUpdate(props.query);
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (prevProps.query !== query) {
      this.handleQueryUpdate(query);
    }
  }

  /**
   * Assigns new values to 'this.state.form' properties
   * @param value
   * @param field
   * */
  handleChange = (field, value) => {
    const { shippingAddress } = this.state;
    this.setState({ shippingAddress: { ...shippingAddress, [field]: value } });
  };

  /**
   * Sends request to mutation to update or create shipping address
   * @param updateShippingAddress
   * */
  handleSubmit = updateShippingAddress => {
    const { props, state } = this;

    updateShippingAddress({
      variables:
        {
          input: {
            ...state.shippingAddress,
            memberId: props.query.id,
          },
        },
    })
      .then(response => {
        this.handleQueryUpdate(response.data.updateCheckoutShippingAddress);
      });
  };

  /**
   * Handles component state updates
   * @param query
   * */
  handleQueryUpdate = query => {
    this.setState({
      shippingAddress: {
        firstName: query.shippingAddress.firstName || null,
        lastName: query.shippingAddress.lastName || null,
        line1: query.shippingAddress.line1 || null,
        line2: query.shippingAddress.line2 || null,
        city: query.shippingAddress.city || null,
        state: query.shippingAddress.state || null,
        postcode: query.shippingAddress.postcode || null,
        company: query.shippingAddress.company || null,
        contactNumber: query.shippingAddress.contactNumber || null,
        countryId: query.shippingAddress.country.id || null,
        addressUnavailableInstructionId: query.shippingAddress.addressUnavailableInstruction.id || null,
      },
    });
  };

  render() {
    const { state } = this;

    return (
      <Mutation
        mutation={UPDATE_CHECKOUT_SHIPPING_ADDRESS}
        refetchQueries={() => [{ query: GET_MEMBER }]}
      >
        {(updateShippingAddress, { loading, error, data }) => {
          if (error) {
            error.graphQLErrors.map(message => console.log('Non-friendly error message', message.message));
          }
          if (loading) return (<div>Loading</div>);
          return (
            <div className="ShippingAddressForm">
              <div className="ShippingAddressForm--form">
                <h2>My Shipping Address</h2>
                <InputField
                  type="text"
                  label="First Name"
                  name="firstName"
                  id="firstName"
                  validations={[checkName]}
                  value={state.shippingAddress.firstName}
                  onChange={this.handleChange}
                />
                <InputField
                  type="text"
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  value={state.shippingAddress.lastName}
                  validations={[checkName]}
                  onChange={this.handleChange}
                />
                <InputField
                  type="text"
                  label="Address line 1"
                  name="line1"
                  id="line1"
                  value={state.shippingAddress.line1}
                  validations={[checkAddress]}
                  onChange={this.handleChange}
                />
                <InputField
                  type="text"
                  label="Address line 2"
                  name="line2"
                  id="line2"
                  value={state.shippingAddress.line2}
                  onChange={this.handleChange}
                />
                <InputField
                  type="text"
                  label="State"
                  name="state"
                  id="state"
                  validations={[checkState]}
                  value={state.shippingAddress.state}
                  onChange={this.handleChange}
                  serverValidation={
                    data && checkServerValidation(data, 'updateCheckoutShippingAddress', 'state')
                  }
                />
                <InputField
                  type="number"
                  label="Contact number"
                  name="contactNumber"
                  id="contactNumber"
                  value={state.shippingAddress.contactNumber}
                  onChange={this.handleChange}
                  serverValidation={
                    data && checkServerValidation(data, 'updateCheckoutShippingAddress', 'contact_number')
                  }
                />
                <InputField
                  type="number"
                  label="Post code"
                  name="postcode"
                  id="postcode"
                  value={state.shippingAddress.postcode}
                  onChange={this.handleChange}
                />
                <InputField
                  type="number"
                  label="Country"
                  name="countryId"
                  id="countryId"
                  value={state.shippingAddress.countryId}
                  onChange={this.handleChange}
                  serverValidation={
                    data && checkServerValidation(data, 'updateCheckoutShippingAddress', 'countryId')
                  }
                />
                <InputField
                  type="text"
                  label="City"
                  name="city"
                  id="city"
                  value={state.shippingAddress.city}
                  onChange={this.handleChange}
                  serverValidation={
                    data && checkServerValidation(data, 'updateCheckoutShippingAddress', 'city')
                  }
                />
                <InputField
                  type="text"
                  label="Company"
                  name="company"
                  id="company"
                  value={state.shippingAddress.company}
                  onChange={this.handleChange}
                />
                <InputField
                  type="number"
                  label="Select Delivery Instructions"
                  name="addressUnavailableInstructionId"
                  id="addressUnavailableInstructionId"
                  value={state.shippingAddress.addressUnavailableInstructionId}
                  onChange={this.handleChange}
                  serverValidation={
                    data && checkServerValidation(
                      data, 'updateCheckoutShippingAddress', 'addressUnavailableInstructionId'
                    )
                  }
                />
                <button
                  type="submit"
                  onClick={() => this.handleSubmit(updateShippingAddress)}
                >
                  Update Shipping Address
                </button>
                {error && (<div>Sorry, there are errors on your form.</div>)}
              </div>
            </div>);
        }}
      </Mutation>
    );
  }
}

export default CheckoutShippingAddressForm;
