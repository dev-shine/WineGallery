import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { WineBox } from '../../components';
import { GET_SHOPPING_CART } from '../../graphql/queries';
import urlPatterns from '../../urls';

import './QuizResults.scss';

/**
 * Renders QuizResults component.
 * */
const QuizResults = props => {
  const { history } = props;

  return (
    <div className="QuizResults">
      <div className="QuizResults--container">
        <h1 className="QuizResults--title">Recommended wines</h1>
        <Query query={GET_SHOPPING_CART} partialRefetch>
          {({ loading, error, data }) => {

            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <div className="QuizResults--recommendation-list">
                {data.me && <WineBox data={data} />}
                <div>
                  <button
                    type="button"
                    onClick={() => history.push(urlPatterns.CHECKOUT)}
                  >
                    get my first box
                  </button>
                  <button
                    type="button"
                    onClick={() => history.push(urlPatterns.WINES_BOX)}
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
};

QuizResults.propTypes = {
  history: PropTypes.shape().isRequired,
};

QuizResults.defaultProps = {};

export default QuizResults;
