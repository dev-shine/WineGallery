import gql from 'graphql-tag';

const CREATE_PAYMENT_METHOD = gql`
  mutation CreateMemberPaymentMethod($input: CreateMemberPaymentMethodInput!) {
    createMemberPaymentMethod(input: $input) {
      paymentMethod{
        paymentApiMethodUuid
        isDefault
        cardBrand
        cardLast4
        cardExpiryMonth
        cardExpiryYear  
      }
      errors {
        messages
        field
      }
    }
  }
`;

const DELETE_PAYMENT_METHOD = gql`
  mutation DeleteMemberPaymentMethod($input: DeletePaymentMethodInput!) {
    deleteMemberPaymentMethod(input: $input) {
      isDeleted
      errors {
        messages
        field
      }
    }
  }
`;

const UPDATE_MEMBER_PAYMENT_METHOD = gql`
  mutation UpdateMemberPaymentMethod($input: UpdateMemberPaymentMethodInput!) {
    updateMemberPaymentMethod(input: $input) {
      paymentMethod {
        paymentApiMethodUuid
        isDefault
        cardBrand
        cardLast4
        cardExpiryMonth
        cardExpiryYear
      }
      errors {
        messages
        field
      }
    }
  }
`;

const CREATE_CONTACT_PREFERENCE = gql`
  mutation CreateMemberContactPreference($input: CreateContactPreferenceInput!) {
    createMemberContactPreference(input: $input) {
      contactPreference {
        id
        contactType{
          id
        }
        contactMethod{
          id
        }
      }
      errors {
        messages
        field
      }
    }
  }
`;

const DELETE_CONTACT_PREFERENCE = gql`
  mutation DeleteMemberContactPreference($input: DeleteContactPreferenceInput!) {
    deleteMemberContactPreference(input: $input) {
      isDeleted
      errors {
        messages
        field
      }
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUpMutation($input: MemberMutationInput!) {
    signUp(input: $input) {
      id
      firstName
      clientMutationId
      errors {
        messages
        field
      }
    }
  }
`;

const SUBMIT_QUIZ = gql`
  mutation SubmitQuiz($input: SubmitQuizInput!) {
    submitQuiz(input: $input) {
      isSuccessful
      accessToken
      refreshToken
      errors {
        messages
        field
      }
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPasswordMutation($email: String!) {
    resetPassword(email: $email) {
      success
      error
    }
  }
`;

const SET_NEW_PASSWORD = gql`
  mutation SetNewPassword(
  $password: String!, $passwordConfirmation: String!, $token: String!, $uidb64: String!
  ) {
    setNewPassword(
      password: $password, passwordConfirmation: $passwordConfirmation, token: $token, uidb64: $uidb64
    ) {
      success
      error
    }
  }
`;

const UPDATE_MEMBER_SHIPPING_ADDRESS = gql`
  mutation UpdateMemberShippingAddress($input: ShippingAddressInput!) {
    updateMemberShippingAddress(input: $input) {
      shippingAddress {
        id
        firstName
        lastName
        company
        line1
        line2
        postcode
        contactNumber
        city
        state
        country {
          id
        }
        addressUnavailableInstruction {
          id
        }
      }
      errors {
        messages
        field
      }
    }
  }
`;

const UPDATE_CHECKOUT_SHIPPING_ADDRESS = gql`
  mutation UpdateCheckoutShippingAddress($input: CheckoutShippingAddressInput!) {
    updateCheckoutShippingAddress(input: $input) {
      shippingAddress {
        id
        firstName
        lastName
        company
        line1
        line2
        postcode
        contactNumber
        city
        state
        country {
          id
        }
        addressUnavailableInstruction {
          id
        }
      }
      errors {
        messages
        field
      }
    }
  }
`;

const UPDATE_MEMBER_ACCOUNT_DETAILS = gql`
  mutation UpdateMemberAccountDetails($input: MemberMutationInput!) {
    updateMember(input: $input) {
      id
      email
      birthDate
      mobileNumber
      gender
      firstName
      lastName
      errors {
        messages
        field
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription ($input:  SubscriptionInput!){
    updateSubscription(input: $input) {
      subscription {
        id
        billingDay
        subscriptionStatus {
          id
          name
        }
        holdUntilDate
        monthFrequency
      }
      errors{
        field
        messages
      }
    }
  }
`;

export {
  CREATE_CONTACT_PREFERENCE,
  CREATE_PAYMENT_METHOD,
  DELETE_CONTACT_PREFERENCE,
  DELETE_PAYMENT_METHOD,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
  SIGN_UP,
  SUBMIT_QUIZ,
  UPDATE_SUBSCRIPTION,
  UPDATE_MEMBER_ACCOUNT_DETAILS,
  UPDATE_MEMBER_PAYMENT_METHOD,
  UPDATE_MEMBER_SHIPPING_ADDRESS,
  UPDATE_CHECKOUT_SHIPPING_ADDRESS,
};
