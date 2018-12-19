import gql from 'graphql-tag';

const GET_WINE_COUNTRIES = gql`
  query WineCountries {
    allWineCountries {
      id
      name
    }
  }
`;
const GET_TASTES = gql`
  query Tastes {
    allTastes {
      id
      name
    }
  }
`;

const GET_FOODS = gql`
  query Foods {
    allFoods {
      id
      name
    }
  }
`;

const GET_SEASONS = gql`
  query Seasons {
    allSeasons {
      id
      name
    }
  }
`;

const GET_WINE_PRODUCTIONS = gql`
  query WineProductions {
    allWineProductionMethods {
      id
      name
    }
  }
`;

const GET_WINE_COLOURS = gql`
  query WineColours {
    allWineClasses {
      id
      name
    }
  }
`;

const GET_WINE_TYPES = gql`
  query WineTypes {
    allWineTypes {
      id
      name
    }
  }
`;

const GET_WINE_BODIES = gql`
  query WineBodies {
    allWineBodies {
      id
      name
    }
  }
`;

const GET_WINE_TANNINS = gql`
  query WineTannins {
    allWineTannins{
      id
      name
    }
  }
`;

const GET_WINE_SWEETNESSES = gql`
  query WineSweetnesses {
    allWineSweetnesses{
      id
      name
    }
  }
`;

const GET_WINES = gql`
  query GetWines (
    $year: String
    $wineClassId: Int
    $wineTypeId: Int
    $wineBodyId: Int
    $wineSweetnessId: Int
    $wineTanninId: Int
    $wineStyleId: Int
    $wineProductionMethodId: Int
    $seasonId: Int
    $tasteId: Int
    $foodId: Int
    $countryId: Int
    $order: AllWinesOrderField
  ) {
    allWines (
      year: $year
      wineClassId: $wineClassId
      wineTypeId: $wineTypeId
      wineBodyId: $wineBodyId
      wineSweetnessId: $wineSweetnessId
      wineTanninId: $wineTanninId
      wineStyleId: $wineStyleId
      wineProductionMethodId: $wineProductionMethodId
      seasonId: $seasonId
      tasteId: $tasteId
      foodId: $foodId
      countryId: $countryId
      order: $order
    ) {
      id
      year
      country {
        name
      }
      product{
        name
        sellingPrice
        productPhotos {
          photoWineListing
        }
      }
      wineType{
        name
        wineClass {
          name
        }
      }
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
      contactpreferenceSet {
        id
        contactType {
          id
          name
        }
        contactMethod {
          id
          name
        }
      }
    }
  }
`;

export {
  GET_FOODS,
  GET_MEMBER,
  GET_SEASONS,
  GET_TASTES,
  GET_WINES,
  GET_WINE_BODIES,
  GET_WINE_COLOURS,
  GET_WINE_COUNTRIES,
  GET_WINE_PRODUCTIONS,
  GET_WINE_SWEETNESSES,
  GET_WINE_TANNINS,
  GET_WINE_TYPES,
};
