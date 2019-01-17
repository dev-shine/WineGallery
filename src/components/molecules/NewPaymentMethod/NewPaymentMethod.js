import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { CREATE_PAYMENT_METHOD } from '../../../graphql/mutations';
import { GET_MEMBER } from '../../../graphql/queries';

import './NewPaymentMethod.scss';

/**
 * Renders NewPaymentMethod component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class NewPaymentMethod extends Component {
  static propTypes = {
    stripe: PropTypes.shape({ createToken: PropTypes.func }),
    me: PropTypes.shape({ subscription: PropTypes.shape({}) }).isRequired,
    onAddCard: PropTypes.func,
  };

  static defaultProps = {
    stripe: null,
    onAddCard: null,
  };

  state = {
    stripeError: null,
  };

  /**
   * Gets token from stripe and sends request to GraphQL backend.
   * Shows and logs error in case error from stripe.
   * @param createPaymentMethod
   * @return {Promise<void>}
   * */
  handleAddPaymentMethod = async createPaymentMethod => {
    // User clicked submit
    const { props } = this;
    const userInfo = {
      name: `${props.me.firstName} ${props.me.lastName}`,
    };

    // Returns error or token from token request to Stripe
    const { token, error } = await props.stripe.createToken(userInfo)
      .then(response => {
        if (response.error) {
          this.setState({ stripeError: response });
        }
        return response;
      });

    // Checks if token is valid and sends request to GraphQL backend
    if (token) {
      await createPaymentMethod({
        variables: {
          input: {
            token: token.id,
            memberId: props.me.id,
          },
        },
      });

      // Closes Add new payment method form
      await props.onAddCard();
    }

    // Logs error
    if (error) console.log(error);
  };

  render() {
    const { onAddCard } = this.props;
    const { stripeError } = this.state;

    return (
      <div className="NewPaymentMethod">
        <div className="NewPaymentMethod--header">
          <h4>Credit Card Information</h4>
          <span tabIndex="0" role="button" onClick={onAddCard} onKeyPress={onAddCard} className="close-btn">
            x
          </span>
        </div>
        <Mutation
          mutation={CREATE_PAYMENT_METHOD}
          refetchQueries={() => [{ query: GET_MEMBER }]}
        >
          {(createPaymentMethod, { loading, error }) => {
            if (error) {
              error.graphQLErrors.map(
                message => console.error(
                  'Non-friendly error message', message.message
                )
              );
            }

            if (loading) return (<div>Loading...</div>);

            return (
              <div className="NewPaymentMethod--form">
                <CardElement />
                <button
                  type="button"
                  onClick={() => this.handleAddPaymentMethod(createPaymentMethod)}
                >
                  Add
                </button>
                {stripeError && <span>{stripeError.error.message}</span>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default injectStripe(NewPaymentMethod);
