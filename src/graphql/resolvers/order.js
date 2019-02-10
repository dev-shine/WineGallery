import gql from 'graphql-tag';

/**
 * QUERIES
 * */

/**
 *  MUTATIONS
 * */

const APPLY_DISCOUNT_CODE = gql`
  mutation AddPromoCodeInfo($input: PromoCodeInfoInput!){
  addPromoCodeInfo(input: $input) {
    name
    discountValue
    message
    errors {
      field
      messages
    }
  }
}
`;

export {
  APPLY_DISCOUNT_CODE, // eslint-disable-line import/prefer-default-export
};
