import gql from 'graphql-tag';

export const UPDATE_SUBSCRIPTION = gql`
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

export const DELETE_WINE_FROM_SUBSCRIPTION = gql`
  mutation DeleteRecommendedWine($input: SwitchRecommendedWineInput!) {
    deleteRecommendedWine(input: $input) {
      isSuccessful
      errors {
        field
        messages
      }
    }
  }
`;

export const ADD_WINE_TO_SUBSCRIPTION = gql`
  mutation AddRecommendedWine($input: SwitchRecommendedWineInput!) {
    addRecommendedWine(input: $input) {
      errors {
        field
        messages
      }
    }
  }
`;
