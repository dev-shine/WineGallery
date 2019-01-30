import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';
import { DELETE_WINE_FROM_SUBSCRIPTION } from '../../../graphql/mutations';
import { GET_SHOPPING_CART } from '../../../graphql/queries';

import { DEFAULT_BOTTLE_URL } from '../../../helpers/constants';

import './WineBox.scss';

/**
 * Renders WineBox component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineBox extends Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    isEditing: PropTypes.bool,
    client: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    isEditing: false,
  };

  /**
   * Remove wine item from wine recommended list
   * @param wineId
   * */
  handleRemoveWineFromBox = wineId => {
    const { client } = this.props;
    const memberId = parseInt(window.localStorage.getItem('memberId'), 10) || null;
    const input = { wineId, memberId };

    client.mutate({
      mutation: DELETE_WINE_FROM_SUBSCRIPTION,
      refetchQueries: () => [{ query: GET_SHOPPING_CART }],
      variables: { input },
    });
  };

  render() {
    const { data, isEditing } = this.props;
    const subscriptionWinesSorted = data.me.subscription && data.me.subscription.subscriptionwineSet
      .sort((a, b) => a.wine.id - b.wine.id);

    return (
      <div className="WineBox">
        {subscriptionWinesSorted
          ? subscriptionWinesSorted.map(subscriptionWine => {

            // Gets wine's photo URL or sets the default one if it doesn't exist
            const photoUrl = subscriptionWine.wine.product.productPhotos.length
              ? subscriptionWine.wine.product.productPhotos[0].photoLarge
              : DEFAULT_BOTTLE_URL;

            return (
              <div className="WineBox--recommendation-item" key={subscriptionWine.wine.product.id}>
                {
                  isEditing && (
                    <button
                      type="button"
                      className="icon"
                      onClick={() => this.handleRemoveWineFromBox(subscriptionWine.wine.id)}
                    >
                      X
                    </button>
                  )
                }
                <div className="WineBox--recommendation-item--name">
                  <p>
                    {subscriptionWine.wine.product.name}
                    {
                      subscriptionWine.quantity > 1 && (
                        <span className="counter">{subscriptionWine.quantity}</span>)
                    }
                  </p>
                </div>
                <p className="WineBox--recommendation-item--region">
                  {subscriptionWine.wine.wineRegion.name}
                </p>
                <img src={photoUrl} alt={subscriptionWine.wine.product.name} />
              </div>
            );
          })
          : (<div>Sorry it seems you do not have your subscription yet.</div>)
        }

      </div>
    );
  }
}

export default withApollo(WineBox);
