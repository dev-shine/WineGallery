import React from 'react';

import { Query } from 'react-apollo';

import { GET_SHOPPING_CART } from '../../graphql/queries';

import './QuizResults.scss';

const DEFAULT_BOTTLE_URL = (
  `${process.env.REACT_APP_TWG_REST_DOMAIN}/static/src/site/img/default-bottle-photo.png`
);

/**
 * Renders QuizResults component.
 * */
const QuizResults = () => (
  <div className="QuizResults">
    <div className="QuizResults--container">
      <h1 className="QuizResults--title">Recommended wines</h1>
      <Query query={GET_SHOPPING_CART}>
        {({ loading, error, data }) => {

          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className="QuizResults--recommendations">
              {data.me.shoppingCart.shoppingcartitemSet.map(recommendedWine => {

                // Gets wine's photo URL or sets the default one it doesn't exist
                const photoUrl = recommendedWine.product.productPhotos.length
                  ? recommendedWine.product.productPhotos[0].photoLarge
                  : DEFAULT_BOTTLE_URL;

                return (
                  <div className="QuizResults--recommendation" key={recommendedWine.product.id}>
                    <p className="QuizResults--recommendation--name">
                      {recommendedWine.product.name}
                    </p>
                    <p className="QuizResults--recommendation--region">
                      {recommendedWine.product.wine.wineRegion.name}
                    </p>
                    <img src={photoUrl} alt={recommendedWine.product.name} />
                  </div>
                );
              })}

              <div>
                <button
                  type="button"
                  onClick={() => console.log('Navigate to the checkout')} // TODO: navigate to the checkout
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

QuizResults.propTypes = {};

export default QuizResults;
