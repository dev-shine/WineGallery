import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { GET_SHOPPING_CART } from '../../graphql/queries';
import urlPatterns from '../../urls';

import './QuizResults.scss';

const DEFAULT_BOTTLE_URL = (
  `${process.env.REACT_APP_REST_DOMAIN}/static/src/site/img/default-bottle-photo.png`
);

/**
 * Renders QuizResults component.
 * */
const QuizResults = props => (
  <div className="QuizResults">
    <div className="QuizResults--container">
      <h1 className="QuizResults--title">Recommended wines</h1>
      <Query query={GET_SHOPPING_CART}>
        {({ loading, error, data }) => {

          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className="QuizResults--recommendation-list">
              {data.me.subscription.subscriptionwineSet.map(subscriptionWine => {

                // Gets wine's photo URL or sets the default one it doesn't exist
                const photoUrl = subscriptionWine.wine.product.productPhotos.length
                  ? subscriptionWine.product.productPhotos[0].photoLarge
                  : DEFAULT_BOTTLE_URL;

                return (
                  <div className="QuizResults--recommendation-item" key={subscriptionWine.wine.product.id}>
                    <p className="QuizResults--recommendation-item--name">
                      {subscriptionWine.wine.product.name}
                    </p>
                    <p className="QuizResults--recommendation-item--region">
                      {subscriptionWine.wine.wineRegion.name}
                    </p>
                    <img src={photoUrl} alt={subscriptionWine.wine.product.name} />
                  </div>
                );
              })}

              <div>
                <button
                  type="button"
                  onClick={() => props.history.push(urlPatterns.CHECKOUT)}
                >
                  get my first box
                </button>
                <button
                  type="button"
                  onClick={() => console.log('Navigate to the wine box')} // TODO: navigate to the wine box
                >
                  change or add wines
                </button>
              </div>

            </div>
          );
        }}
      </Query>
    </div>
  </div>
);

QuizResults.propTypes = {
  history: PropTypes.shape({ push: PropTypes.shape({}) }),
};

QuizResults.defaultProps = {
  history: null,
};

export default QuizResults;
