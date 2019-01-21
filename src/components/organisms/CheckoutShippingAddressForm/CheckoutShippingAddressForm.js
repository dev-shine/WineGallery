import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  checkAddress,
  checkName,
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
    me: PropTypes.shape({
      shippingAddress: PropTypes.shape({
        id: PropTypes.number,
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
    isCheckoutPage: PropTypes.bool,
    handleShippingAddressChange: PropTypes.func,
  };

  static defaultProps = {
    me: [{}],
    isCheckoutPage: false,
    handleShippingAddressChange: null,
  };

  state = {
    shippingAddress: {
      shippingAddressId: null,
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
   *  TODO: [DEV-167] & [DEV-203] This React lifecycle method will be deprecated in future versions of React
   *  Actions: to consider a better design
   *  */
  componentWillMount() {
    const { props } = this;
    if (props.me.shippingAddress) this.handleQueryUpdate(props.me);
  }

  componentDidUpdate(prevProps) {
    const { me } = this.props;

    if (prevProps.me !== me) {
      this.handleQueryUpdate(me);
    }
  }

  /**
   * Assigns new values to 'this.state.form' properties
   * @param {*} value
   * @param {string} field
   * */
  handleChange = async (field, value) => {
    const { shippingAddress } = this.state;
    const { handleShippingAddressChange } = this.props;

    this.setState({ shippingAddress: { ...shippingAddress, [field]: value } });

    // TODO: [DEV-203] Improve this when link state is introduced
    await handleShippingAddressChange({ ...shippingAddress, [field]: value });
  };

  /**
   * Handles component state updates
   * @param {Object} query
   * */
  handleQueryUpdate = async query => {
    const { handleShippingAddressChange } = this.props;
    const shippingAddressUpdated = {
      shippingAddressId: query.shippingAddress.id || null,
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
    };

    this.setState({
      shippingAddress: { ...shippingAddressUpdated },
    });

    // TODO: [DEV-203] Improve this when link state is introduced
    handleShippingAddressChange({ ...shippingAddressUpdated });
  };

  render() {
    const { state } = this;
    const { isCheckoutPage } = this.props;

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
          />
          <InputField
            type="number"
            label="Contact number"
            name="contactNumber"
            id="contactNumber"
            value={state.shippingAddress.contactNumber}
            onChange={this.handleChange}
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
          />
          <InputField
            type="text"
            label="City"
            name="city"
            id="city"
            value={state.shippingAddress.city}
            onChange={this.handleChange}
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
          />
          {

            // Form is submitted from Checkout component if checkout page
            !isCheckoutPage && (
              <button
                type="submit"
                onClick={this.handleSubmit}
              >
                Update Shipping Address
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default CheckoutShippingAddressForm;
