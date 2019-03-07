import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import { isLoggedIn } from '../../../helpers/auth';
import { GET_MEMBER, GET_REFERRAL_DISCOUNT } from '../../../graphql/queries';
import {
  DISCOUNT_TYPES_IDS,
  DISCOUNT_TYPES_VALUES,
  FETCH_POLICY_CACHE_ONLY,
} from '../../../helpers/constants';

import './HeaderDiscountMessage.scss';

/**
 * Renders HeaderDiscountMessage.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class HeaderDiscountMessage extends Component {
  static propTypes = {
    meQuery: PropTypes.shape({
      me: PropTypes.shape({
        shoppingCart: PropTypes.shape({
          discountType: PropTypes.shape({
            id: PropTypes.number,
          }),
        }),
      }),
    }).isRequired,
    referralDiscountQuery: PropTypes.shape({
      referralDiscount: PropTypes.shape({
        referralCode: PropTypes.string,
        giveawayCode: PropTypes.string,
      }),
    }).isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { meQuery, referralDiscountQuery } = this.props;

    const currentDiscountTypeId = meQuery.me && meQuery.me.shoppingCart
      && meQuery.me.shoppingCart.discountType && meQuery.me.shoppingCart.discountType.id;
    const nextDiscountTypeId = nextProps.meQuery.me && nextProps.meQuery.me.shoppingCart
      && nextProps.meQuery.me.shoppingCart.discountType && nextProps.meQuery.me.shoppingCart.discountType.id;

    const currentReferralCode = referralDiscountQuery.referralDiscount.referralCode;
    const currentGiveawayCode = referralDiscountQuery.referralDiscount.giveawayCode;
    const nextReferralCode = nextProps.referralDiscountQuery.referralDiscount.referralCode;
    const nextGiveawayCode = nextProps.referralDiscountQuery.referralDiscount.giveawayCode;

    // Updates component if discountTypeId has been changed or if referral/giveaway codes from
    // apollo-link-state have been changed
    return !(
      currentDiscountTypeId === nextDiscountTypeId
      && currentReferralCode === nextReferralCode
      && currentGiveawayCode === nextGiveawayCode
    );
  }

  /**
   * Gets discount message if referral or giveaway codes are applied.
   *
   * @return {string|null}
   */
  getDiscountMessage = () => {
    const { meQuery, referralDiscountQuery } = this.props;

    let hasReferralDiscount = false;
    let hasGiveawayDiscount = false;

    if (isLoggedIn()) {

      // For logged users gets discount from the shopping cart
      const discountType = meQuery.me && meQuery.me.shoppingCart && meQuery.me.shoppingCart.discountType;
      hasReferralDiscount = (
        discountType && discountType.id === DISCOUNT_TYPES_IDS.DB_ID_DISCOUNT_TYPE_REFERRAL
      );
      hasGiveawayDiscount = (
        discountType && discountType.id === DISCOUNT_TYPES_IDS.DB_ID_DISCOUNT_TYPE_GIVEAWAY
      );
    } else {

      // For users not logged in gets referral and giveaway codes from apollo-link-state
      const { referralCode, giveawayCode } = referralDiscountQuery.referralDiscount;
      hasGiveawayDiscount = Boolean(referralCode) && Boolean(giveawayCode);
      hasReferralDiscount = Boolean(referralCode);
    }

    let discountValue = 0;
    if (hasGiveawayDiscount) {
      discountValue = DISCOUNT_TYPES_VALUES.DB_ID_DISCOUNT_TYPE_GIVEAWAY;
    } else if (hasReferralDiscount) {
      discountValue = DISCOUNT_TYPES_VALUES.DB_ID_DISCOUNT_TYPE_REFERRAL;
    }

    if (discountValue) return `You have $${discountValue} discount`;
    return null;
  };

  render() {
    const discountMessage = this.getDiscountMessage();

    return (
      <div className="HeaderDiscountMessage">
        {discountMessage && <p>{discountMessage}</p>}
      </div>
    );
  }
}

export default compose(
  graphql(
    GET_REFERRAL_DISCOUNT, {
      name: 'referralDiscountQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(GET_MEMBER, { name: 'meQuery' }),
)(HeaderDiscountMessage);
