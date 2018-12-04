import gql from 'graphql-tag';

const GET_WINES = gql`
  query GetWines {
    allWines {
      id
      year
    }
  }
`;

export default GET_WINES;
