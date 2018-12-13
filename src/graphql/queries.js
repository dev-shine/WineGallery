import gql from 'graphql-tag';

const GET_WINES = gql`
  query GetWines {
    allWines {
      id
      year
    }
  }
`;

const GET_MEMBER = gql`
  query Me {
      me {
      id
      email
      birthDate
      mobileNumber
      gender
      firstName
      lastName
      shippingAddress {
        id
        firstName
        lastName
        line1
        line2
        company
        state
        postcode
        contactNumber
        city
        state
        country {
          id
          name
        }
        addressUnavailableInstruction {
          id
          nameShort
          specifyLocation
        }
      }
    }
  }
`;

export {
  GET_WINES,
  GET_MEMBER,
};
