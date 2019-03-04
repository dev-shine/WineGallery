import gql from 'graphql-tag';

/**
 * QUERIES
 * */

export const GET_MEMBER = gql`
  query Me {
    me {
      id
      email
      birthDate
      mobileNumber
      gender
      firstName
      lastName
      hasUpdatedPassword
      points
      orderedWineCountries {
        id
        name
        code
      }
      orderItemsWithRatings {
        id
        createdDate
        order {
          id
          subscriptionMonth
        }
        product {
          id
          name
          productPhotos{
            id
            photoLarge
          }
          wine {
            id
            year
            wineRegion {
              id
              name
            }
            country {
              id
              name
            }
            wineratingSet {
              id
              score
              note
              liked
              totalDownvotes
            }
          }
        }
      }  
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
        pastMonthStatus
        pastMonthMonthLabel
        canPastMonthWinesBeChanged
        nextMonthStatus
        nextMonthMonthLabel
        canNextMonthWinesBeChanged
        subscriptionStatus {
          id
          name
        }
        subscriptionwineSet {
          quantity
          wine {
            id
            year
            country {
              id
              name
            }
            product {
              id
              name
              slug
              sellingPrice
              productPhotos {
                id
                photoWineListing
                photoLarge
              }
            }
            wineType {
              id
              name
              wineClass {
                id
                name
              }
            }
            wineRegion {
              id
              name
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
        totalShippingFee
        shoppingcartitemSet {
          quantity
          product {
            id
            name
            sellingPrice
            productType {
              id
              name
            }
            productPhotos {
              id
              photoLarge
            }
            wine {
              id
              year
              country {
                id
                name
              }
              product {
                id
                name
                slug
                sellingPrice
                productPhotos {
                  id
                  photoWineListing
                  photoLarge
                }
              }
              wineType{
                id
                name
                wineClass {
                  id
                  name
                }
              }
              wineRegion {
                id
                name
              }
            }
          }
        }
      }
      winequantitySet {
        numberOfBottles
        wineClass {
          id
          name
        }
        winePricePoint {
          id
          isEnabled
          name
          sellingPrice
          sortOrder
        }
      }
      currentBadge {
        id
        name
        imageSmallUrl
        level
      }
      nextBadge {
        id
        name
        imageSmallUrl
        level
        badgerulesSet {
          quantity
        }
      }
      latestBadge {
        id
        imageSmallUrl
        name
        shortDescription
      }
      lockedBadges {
        id
        name
        imageSmallUrl
        points
      }
      chargedOrders {
        id
        chargeDate
        description
        orderStatus {
          id
          name
        }
        orderCategory {
          id
          name
        }
        delivery {
          trackingCode
          trackingUrl
        }
      }
    }
  }
`;

export const GET_SHOPPING_CART = GET_MEMBER;

/**
 * MUTATIONS
 * */

export const CREATE_PAYMENT_METHOD = gql`
  mutation CreateMemberPaymentMethod($input: CreateMemberPaymentMethodInput!) {
    createMemberPaymentMethod(input: $input) {
      paymentMethod{
        id
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

export const DELETE_PAYMENT_METHOD = gql`
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

export const UPDATE_MEMBER_PAYMENT_METHOD = gql`
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

export const CREATE_CONTACT_PREFERENCE = gql`
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

export const DELETE_CONTACT_PREFERENCE = gql`
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

export const SIGN_UP = gql`
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

export const RESET_PASSWORD = gql`
  mutation ResetPasswordMutation($email: String!) {
    resetPassword(email: $email) {
      success
      error
    }
  }
`;

export const SET_NEW_PASSWORD = gql`
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

export const UPDATE_MEMBER_SHIPPING_ADDRESS = gql`
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

export const UPDATE_MEMBER_ACCOUNT_DETAILS = gql`
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

export const UPDATE_WINE_PREFERENCE = gql`
  mutation UpdateMemberWineQuantity($input: UpdateMemberWineQuantityInput!) {
    updateMemberWineQuantity (input: $input){
      wineQuantity {
        wineClass {
          id
        }
        winePricePoint {
          id
        }
        numberOfBottles
      }
      errors {
        field
        messages
      }
    }
  }
`;

export const UPDATE_WINE_RATING = gql`
mutation UpdateWineRating ($input: WineRatingInput!) {
  updateWineRating(input: $input) {
    wineRating {
      id
      liked
      totalUpvotes
      totalDownvotes
      note
      score
    }
  }
}
`;

export const GET_TOP_MEMBERS = gql`
  query TopMembers (
    $limit: Int
    $offset: Int
  ) {
    topMembers (
      limit: $limit
      offset: $offset
    ) {
      id
      firstName
      lastName
      points
      avatarThumbnail
      slug
    }
  }
`;
