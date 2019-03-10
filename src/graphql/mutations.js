/**
 * All mutations should be imported and exported to and from this file.
 * */

// Member
import {
  CREATE_CONTACT_PREFERENCE,
  CREATE_PAYMENT_METHOD,
  DELETE_CONTACT_PREFERENCE,
  DELETE_PAYMENT_METHOD,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
  SIGN_UP,
  UPDATE_WINE_PREFERENCE,
  UPDATE_MEMBER_ACCOUNT_DETAILS,
  UPDATE_MEMBER_PAYMENT_METHOD,
  UPDATE_MEMBER_SHIPPING_ADDRESS,
  UPDATE_WINE_RATING,
  INVITE_FRIEND,
} from './resolvers/member';

// Shopping Cart
import {
  ADD_SHOPPING_CART_ITEM,
  CHECKOUT,
  DELETE_SHOPPING_CART_ITEM,
  UPDATE_SHOPPING_CART_ITEM,
} from './resolvers/cart';

// Subscription
import {
  ADD_WINE_TO_SUBSCRIPTION,
  DELETE_WINE_FROM_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from './resolvers/subscription';

// Special Pack
import { ADD_SPECIAL_PACK_INTEREST } from './resolvers/specialPack';

// Order
import { APPLY_DISCOUNT_CODE } from './resolvers/order';

// Quiz
import { SUBMIT_QUIZ } from './resolvers/quiz';

export {
  ADD_SHOPPING_CART_ITEM,
  APPLY_DISCOUNT_CODE,
  ADD_WINE_TO_SUBSCRIPTION,
  ADD_SPECIAL_PACK_INTEREST,
  CHECKOUT,
  CREATE_CONTACT_PREFERENCE,
  CREATE_PAYMENT_METHOD,
  DELETE_CONTACT_PREFERENCE,
  DELETE_PAYMENT_METHOD,
  DELETE_SHOPPING_CART_ITEM,
  DELETE_WINE_FROM_SUBSCRIPTION,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
  SIGN_UP,
  SUBMIT_QUIZ,
  UPDATE_MEMBER_ACCOUNT_DETAILS,
  UPDATE_MEMBER_PAYMENT_METHOD,
  UPDATE_MEMBER_SHIPPING_ADDRESS,
  UPDATE_SHOPPING_CART_ITEM,
  UPDATE_SUBSCRIPTION,
  UPDATE_WINE_PREFERENCE,
  UPDATE_WINE_RATING,
  INVITE_FRIEND,
};
