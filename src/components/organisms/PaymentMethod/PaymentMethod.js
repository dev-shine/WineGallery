import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { UPDATE_MEMBER_PAYMENT_METHOD, DELETE_PAYMENT_METHOD } from '../../../graphql/mutations';
import { GET_MEMBER } from '../../../graphql/queries';
import { NewPaymentMethod } from '../..';

import './PaymentMethod.scss';

// Declares images for credit card icons
const amexIcon = require('../../../assets/images/credit-cards/AMEX.png');
const visaIcon = require('../../../assets/images/credit-cards/VISA.png');
const mastercardIcon = require('../../../assets/images/credit-cards/MASTERCARD.png');
const payPalIcon = require('../../../assets/images/credit-cards/PAYPAL.png');

// Maps possible brands from Stripe https://stripe.com/docs/api/cards/object#card_object-brand
const CREDIT_CARD_BRAND_MAP = new Map([
  ['American Express', 'AMEX'],
  ['MasterCard', 'MASTERCARD'],
  ['Visa', 'VISA'],
  ['Unknown', 'UNKNOWN'],
]);

const creditCardIcons = {
  AMEX: amexIcon,
  MASTERCARD: mastercardIcon,
  PAYPAL: payPalIcon,
  VISA: visaIcon,
};

const defaultState = {
  showFormAddNewPaymentMethod: false,
};

/**
 * Renders PaymentMethod component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class PaymentMethod extends Component {
  static propTypes = {
    query: PropTypes.shape({ subscription: PropTypes.shape({}) }),
  };

  static defaultProps = {
    query: null,
  };

  state = defaultState;

  componentDidMount() {
  }

  /**
   * Deletes card from member
   * @param deletePaymentMethod
   * @param paymentApiMethodUuid
   * */
  handleDeletePaymentMethod = (deletePaymentMethod, paymentApiMethodUuid) => {
    const { query } = this.props;
    deletePaymentMethod({
      variables: {
        input: {
          apiUuid: paymentApiMethodUuid,
          memberId: query.id,
        },
      },
    });
  };

  /**
   * Sets card as the default payment method
   * @param updatePaymentMethod
   * @param paymentApiMethodUuid
   * */
  handleMakePaymentMethodDefault = (updatePaymentMethod, paymentApiMethodUuid) => {
    const { query } = this.props;
    updatePaymentMethod({
      variables: {
        input: {
          apiUuid: paymentApiMethodUuid,
          memberId: query.id,
          isDefault: true,
        },
      },
    });
  };

  /**
   * Closes new payment method form.
   * */
  handleClosePaymentMethodForm = () => {
    this.setState(defaultState);
  };

  render() {
    const { props, state } = this;
    const { query } = props;
    const paymentList = query && query.paymentmethodSet && query.paymentmethodSet;
    return (
      <div className="PaymentMethod">
        <h2>Update Subscription Status</h2>
        <div className="PaymentMethod--container">
          <div className="PaymentMethod--title">
            <h3>Payment Methods</h3>
            {
              state.showFormAddNewPaymentMethod
                ? (
                  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
                    <Elements>
                      <NewPaymentMethod query={query} onAddCard={this.handleClosePaymentMethodForm} />
                    </Elements>
                  </StripeProvider>
                )
                : (
                  <div className="PaymentMethod--cards">
                    {
                      paymentList && paymentList.length
                        ? paymentList.map(card => (
                          <div key={card.paymentApiMethodUuid} className="PaymentMethod--cards--item">
                            <span className="vh">{card.paymentApiMethodUuid}</span>
                            <img
                              src={creditCardIcons[CREDIT_CARD_BRAND_MAP.get(card.cardBrand)]}
                              alt=""
                            />
                            <div>
                              {`xxxx xxxx xxxx ${card.cardLast4}`}
                              <br />
                              {`${card.cardExpiryMonth} / ${card.cardExpiryYear}`}
                            </div>

                            {/* Updates payment method to be the default */}
                            <div>
                              {!card.isDefault
                                ? (
                                  <Mutation
                                    mutation={UPDATE_MEMBER_PAYMENT_METHOD}
                                    refetchQueries={() => [{ query: GET_MEMBER }]}
                                  >
                                    {(updatePaymentMethod, { loading, error }) => {
                                      if (error) {
                                        error.graphQLErrors.map(
                                          message => console.error(
                                            'Non-friendly error message', message.message
                                          )
                                        );
                                      }
                                      if (loading) {
                                        return (<div>Loading...</div>);
                                      }
                                      return (
                                        <button
                                          type="button"
                                          className="icon"
                                          onClick={() => this.handleMakePaymentMethodDefault(
                                            updatePaymentMethod, card.paymentApiMethodUuid
                                          )}
                                        >
                                          Default
                                        </button>);
                                    }}
                                  </Mutation>
                                )
                                : (<div>Default Payment</div>)
                              }
                            </div>

                            {/* Deletes payment method */}
                            <div>
                              {!card.isDefault && (
                                <Mutation
                                  mutation={DELETE_PAYMENT_METHOD}
                                  refetchQueries={() => [{ query: GET_MEMBER }]}
                                >
                                  {(deletePaymentMethod, { loading, error }) => {
                                    if (error) {
                                      error.graphQLErrors.map(
                                        message => console.error(
                                          'Non-friendly error message', message.message
                                        )
                                      );
                                    }
                                    if (loading) {
                                      return (<div>Loading...</div>);
                                    }
                                    return (
                                      <button
                                        type="button"
                                        className="icon"
                                        onClick={() => this.handleDeletePaymentMethod(
                                          deletePaymentMethod, card.paymentApiMethodUuid
                                        )}
                                      >
                                        Delete
                                      </button>);
                                  }}
                                </Mutation>
                              )}
                            </div>
                          </div>
                        ))
                        : (
                          <div>
                            You have no payment method registered yet, please start by clicking on the button
                            below.
                          </div>)
                    }
                    <button
                      type="submit"
                      onClick={() => this.setState({ showFormAddNewPaymentMethod: true })}
                    >
                      Add new card
                    </button>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentMethod;
