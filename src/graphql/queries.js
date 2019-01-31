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

const GET_WINE = gql`
  query GetWine (
    $slug: String!
    $memberId: Int
  ) {
    wine (
      slug: $slug
      memberId: $memberId
    ) {
      id
      memberLikelihood
      fullDescription
      sommelierNotes
      pairingsDescription
      alcoholPercentage
      videoUrl
      year
      oakAged
      product {
        id
        name
        sellingPrice
        skuCode
        coverPhotoLarge
        productPhotos {
          photoLarge
        }
      }
      country {
        id
        name
      }
      wineRegion {
        id
        name
      }
      wineType {
        id
        name
      }
      wineMaker {
        id
        name
      }
      wineSweetness {
        id
        level
        name
      }
      wineBody {
        id
        level
        name
      }
      wineTannin {
        id
        level
        name
      }
      wineAcidity {
        id
        level
        name
      }
      wineCellarPeriod {
        id
        name
        shortDescription
      }
      wineProductionMethods {
        id
        name
      }
      wineBarrelType {
        name
        id
      }
      tastes {
        id
        name
      }
      food {
        id
        name
      }
      seasons {
        id
        name
      }
      moods {
        id
        name
      }
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
      product {
        id
        name
        slug
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
      subscription {
        id
        monthFrequency
        holdUntilDate
        billingDay
        subscriptionStatus {
          id
          name
        }
        subscriptionwineSet {
          quantity
          wine {
            id
            wineRegion {
              id
              name
            }
            product {
              id
              name
              productPhotos {
                id
                photoLarge
              }
            }
          }
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
      paymentmethodSet {
        paymentApiMethodUuid
        isDefault
        cardBrand
        cardLast4
        cardExpiryMonth
        cardExpiryYear
      }
      shoppingCart {
        id
        discount
        discountCode
        total
        shoppingcartitemSet {
          quantity
          product {
            id
            name
            productType {
              id
              name
            }
            sellingPrice
          }
        }
      }
      winepreference {
        id
        redBottles
        whiteBottles
        roseBottles
        sparklingBottles
      }
    }
  }
`;

const GET_SHOPPING_CART = gql`
  query Me {
    me {
      id
      subscription {
        id
        sellingPrice
        subscriptionwineSet {
          quantity
          wine {
            id
            wineRegion {
              id
              name
            }
            product {
              id
              name
              productPhotos {
                photoLarge
              }
            }
          }
        }
      }
      shoppingCart {
        id
        shoppingcartitemSet {
          quantity
          product {
            id
            name
            sellingPrice
            productPhotos {
              id
              photoLarge
            }
            wine {
              id
              wineRegion {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

const GET_QUIZ_QUESTIONS = gql`
  query QuizQuestions {
    quizQuestions {
      id
      description
      maxAnswers
      quizanswerSet {
        id
        description
        photoUrl
      }
    }
  }
`;

const GET_ALL_SPECIAL_PACKS = gql`
  query AllSpecialPackEditions (
  $limit: Int
  $offset: Int
  ) {
    allSpecialPackEditions (
      limit: $limit
      offset: $offset
    ) {
      id
      heroTopImageLargeUrl
      section1Title
      section1Text
      seoTitle
      seoDescription
      heroTopImageLargeUrl
      isAvailable
      product {
        id
        slug
      }
    }
  }
`;

const GET_SPECIAL_PACK_DETAILS = gql`
  query SpecialPackEdition (
  $slug: String!
  ) {
    specialPackEdition (
      slug: $slug
    ) {
      id
      heroTopImageLargeUrl
      buyButtonText
      heroTopTitle
      heroTopSubTitle
      heroTopTheme
      heroTopTextPosition
      heroDisabledText
      section1Title
      section1Text
      section2Title
      section2Text
      section3Title
      section3Text
      heroBottomTitle
      heroBottomSubTitle
      heroBottomTheme
      seoTitle
      seoDescription
      heroTopImageLargeUrl
      heroBottomImageLargeUrl
      section1ImageLargeUrl
      section2ImageLargeUrl
      section3ImageLargeUrl
      isAvailable
      product {
        id
        name
        productType {
          id
          isEnabled
          name
        }
        coverPhotoLarge
        slug
        skuCode
        sellingPrice
        productPhotos {
          id
          photoLarge
          photoWineListing
        }
        wine {
          id
          wineMaker  {
            name
            id
          }
          product  {
            name
            id
            productType {
              id
              name
            }
            productPhotos {
              id
              photoLarge
            }
            sellingPrice
          }
          wineType  {
            name
            id
          }
          wineRegion {
            name
            id
          }
          country  {
            name
            id
            code
          }
          wineBody {
            name
            id
          }
          wineTannin {
            name
            id
          }
          wineAcidity {
            name
            id
          }
          wineSweetness {
            name
            id
          }
          wineBarrelType {
            name
            id
          }
          wineCellarPeriod {
            name
            id
          }
          wineProductionMethods  {
            name
            id
          }
          fullDescription
          country {
            id
            name
            code
          }
          food {
            name
            id
          }
          moods  {
            name
            id
          }
          tastes {
            name
            id
          }
          year
          alcoholPercentage
          sommelierNotes
          videoUrl
          pairingsDescription
          oakAged
          memberLikelihood
        }
      }
    }
  }
`;

export {
  GET_ALL_SPECIAL_PACKS,
  GET_FOODS,
  GET_MEMBER,
  GET_QUIZ_QUESTIONS,
  GET_SEASONS,
  GET_SHOPPING_CART,
  GET_SPECIAL_PACK_DETAILS,
  GET_TASTES,
  GET_WINE,
  GET_WINES,
  GET_WINE_BODIES,
  GET_WINE_COLOURS,
  GET_WINE_COUNTRIES,
  GET_WINE_PRODUCTIONS,
  GET_WINE_SWEETNESSES,
  GET_WINE_TANNINS,
  GET_WINE_TYPES,
};
