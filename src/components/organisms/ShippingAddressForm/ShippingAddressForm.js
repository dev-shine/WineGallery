import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import { GET_MEMBER } from '../../../graphql/queries';
import { UPDATE_MEMBER_SHIPPING_ADDRESS } from '../../../graphql/mutations';
import {
  checkAddress,
  checkName,
  checkServerValidation,
  checkState,
} from '../../../helpers/validations';
import { InputField } from '../..';

import './ShippingAddressForm.scss';

/**
 * Renders MyAccountForm in a stateless component
 * Stateless Components (Function Components):
 * https://reactjs.org/docs/components-and-props.html#function-and-class-components
 * */
const ShippingAddressForm = props => {
  const { me } = props;

  // Initiates variables that will hold the value to pass into the mutation
  let city;
  let line1;
  let line2;
  let country;
  let company;
  let postcode;
  let lastName;
  let firstName;
  let contactNumber;
  let stateTerritory;
  let addressUnavailableInstruction;

  // Verifies if member has shipping address
  const hasShippingAddress = !!me.shippingAddress;

  return (
    <Mutation mutation={UPDATE_MEMBER_SHIPPING_ADDRESS} refetchQueries={() => [{ query: GET_MEMBER }]}>
      {(updateShippingAddress, { data, error }) => {
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
                        memberId: me.id,
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
                  validations={[checkName]}
                  value={hasShippingAddress ? me.shippingAddress.firstName : ''}
                  reference={node => {
                    firstName = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  value={hasShippingAddress ? me.shippingAddress.lastName : ''}
                  validations={[checkName]}
                  reference={node => {
                    lastName = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Address line 1"
                  name="addressLine1"
                  id="addressLine1"
                  value={hasShippingAddress ? me.shippingAddress.line1 : ''}
                  validations={[checkAddress]}
                  reference={node => {
                    line1 = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Address line 2"
                  name="addressLine2"
                  id="addressLine2"
                  value={hasShippingAddress && me.shippingAddress.line2 ? me.shippingAddress.line2 : ''}
                  reference={node => {
                    line2 = node;
                  }}
                />
                <InputField
                  type="text"
                  label="State"
                  name="stateTerritory"
                  id="stateTerritory"
                  validations={[checkState]}
                  value={hasShippingAddress ? me.shippingAddress.state : ''}
                  reference={node => {
                    stateTerritory = node;
                  }}
                />
                <InputField
                  type="number"
                  label="Contact number"
                  name="contactNumber"
                  id="contactNumber"
                  value={hasShippingAddress ? me.shippingAddress.contactNumber : ''}
                  reference={node => {
                    contactNumber = node;
                  }}
                  serverValidation={
                    data && checkServerValidation(data, 'updateMemberShippingAddress', 'contact_number')
                  }
                />
                <InputField
                  type="number"
                  label="Post code"
                  name="postCode"
                  id="postCode"
                  value={hasShippingAddress ? me.shippingAddress.postcode : ''}
                  reference={node => {
                    postcode = node;
                  }}
                />
                <InputField
                  type="number"
                  label="Country"
                  name="country"
                  id="country"
                  value={hasShippingAddress ? me.shippingAddress.country.id : ''}
                  reference={node => {
                    country = node;
                  }}
                  serverValidation={
                    data && checkServerValidation(data, 'updateMemberShippingAddress', 'countryId')
                  }
                />
                <InputField
                  type="text"
                  label="City"
                  name="city"
                  id="city"
                  value={hasShippingAddress ? me.shippingAddress.city : ''}
                  reference={node => {
                    city = node;
                  }}
                  serverValidation={
                    data && checkServerValidation(data, 'updateMemberShippingAddress', 'city')
                  }
                />
                <InputField
                  type="text"
                  label="Company"
                  name="company"
                  id="company"
                  value={hasShippingAddress ? me.shippingAddress.company : ''}
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
                    hasShippingAddress ? me.shippingAddress.addressUnavailableInstruction.id : ''
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
  me: PropTypes.shape({
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

ShippingAddressForm.defaultProps = {
  me: [{}],
};

export default ShippingAddressForm;
