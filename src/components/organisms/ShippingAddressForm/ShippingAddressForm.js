import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import { GET_MEMBER } from '../../../graphql/queries';
import { UPDATE_MEMBER_SHIPPING_ADDRESS } from '../../../graphql/mutations';
import InputField from '../../atoms/InputField/InputField';

import './ShippingAddressForm.scss';

/**
 * Renders MyAccountForm in a stateless component
 * Stateless Components (Function Components):
 * https://reactjs.org/docs/components-and-props.html#function-and-class-components
 * */
const ShippingAddressForm = props => {
  const { query } = props;

  // Initiates variables that will hold the value to pass into the mutation
  let firstName;
  let lastName;
  let city;
  let line1;
  let line2;
  let postcode;
  let country;
  let contactNumber;
  let stateTerritory;
  let company;
  let addressUnavailableInstruction;

  // Verifies if member has shipping address
  const hasShippingAddress = !!query.shippingAddress;

  return (
    <Mutation mutation={UPDATE_MEMBER_SHIPPING_ADDRESS} refetchQueries={() => [{ query: GET_MEMBER }]}>
      {(updateShippingAddress, { error }) => {
        if (error) {
          error.graphQLErrors.map(message => console.log('Non-friendly error message', message.message));
        }
        return (
          <div className="ShippingAddressForm">
            <div className="ShippingAddressForm--form">
              <h2>My Shipping Address</h2>
              <form onSubmit={e => {
                e.preventDefault();
                updateShippingAddress({
                  variables:
                    {
                      input: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        line1: line1.value,
                        line2: line2.value,
                        city: city.value,
                        postcode: postcode.value,
                        contactNumber: contactNumber.value,
                        countryId: parseInt(country.value, 10),
                        state: stateTerritory.value,
                        company: company.value,
                        addressUnavailableInstructionId: addressUnavailableInstruction.value,
                        memberId: query.id,
                      },
                    },
                });
              }}
              >
                <InputField
                  type="text"
                  label="First Name"
                  name="firstName"
                  id="firstName"
                  value={hasShippingAddress ? query.shippingAddress.firstName : ''}
                  reference={node => {
                    firstName = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  value={hasShippingAddress ? query.shippingAddress.lastName : ''}
                  reference={node => {
                    lastName = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Address line 1"
                  name="addressLine1"
                  id="addressLine1"
                  value={hasShippingAddress ? query.shippingAddress.line1 : ''}
                  reference={node => {
                    line1 = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Address line 2"
                  name="addressLine2"
                  id="addressLine2"
                  value={hasShippingAddress ? query.shippingAddress.line2 : ''}
                  reference={node => {
                    line2 = node;
                  }}
                />
                <InputField
                  type="text"
                  label="State"
                  name="stateTerritory"
                  id="stateTerritory"
                  value={hasShippingAddress ? query.shippingAddress.state : ''}
                  reference={node => {
                    stateTerritory = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Contact number"
                  name="contactNumber"
                  id="contactNumber"
                  value={hasShippingAddress ? query.shippingAddress.contactNumber : ''}
                  reference={node => {
                    contactNumber = node;
                  }}
                />
                <InputField
                  type="number"
                  label="Post code"
                  name="postCode"
                  id="postCode"
                  value={hasShippingAddress ? query.shippingAddress.postcode : ''}
                  reference={node => {
                    postcode = node;
                  }}
                />
                <InputField
                  type="number"
                  label="Country"
                  name="country"
                  id="country"
                  value={hasShippingAddress ? query.shippingAddress.country.id : ''}
                  reference={node => {
                    country = node;
                  }}
                />
                <InputField
                  type="text"
                  label="City"
                  name="city"
                  id="city"
                  value={hasShippingAddress ? query.shippingAddress.city : ''}
                  reference={node => {
                    city = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Company"
                  name="company"
                  id="company"
                  value={hasShippingAddress ? query.shippingAddress.company : ''}
                  reference={node => {
                    company = node;
                  }}
                />
                <InputField
                  type="number"
                  label="Select Delivery Instructions"
                  name="deliveryInstructions"
                  id="deliveryInstructions"
                  value={
                    hasShippingAddress ? query.shippingAddress.addressUnavailableInstruction.id : ''
                  }
                  reference={node => {
                    addressUnavailableInstruction = node;
                  }}
                />
                <button type="submit">Update Shipping Address</button>
              </form>
            </div>
          </div>);
      }}
    </Mutation>
  );
};

// Declares type for props coming from parent component
ShippingAddressForm.propTypes = {
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
        id: PropTypes.string,
        name: PropTypes.string,
        code: PropTypes.bool,
      }),
      addressUnavailableInstruction: PropTypes.shape({
        id: PropTypes.string,
        nameShort: PropTypes.string,
        authorityToLeave: PropTypes.bool,
      }),
    }),
    email: PropTypes.string,
    id: PropTypes.string,
  }),
};

ShippingAddressForm.defaultProps = {
  query: [{}],
};

export default ShippingAddressForm;
