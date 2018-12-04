import React, { Component } from 'react';

import gql from 'graphql-tag';

import ErrorBoundary from '../../Helpers/ErrorBoundary';
import { SimpleList } from '../../components';

import './Wines.scss';

const GET_WINES = gql`
  {
    allWines {
      id
      year
    }
  }
`;

/**
 * Renders wine list page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Wines extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {}

  render() {
    return (
      <div className="Wines">
        <section className="Wines--container">
          <div className="Wines_inner">
            <div className="Wines--list">
              {/* ORGANISM */}
              <ErrorBoundary>
                <SimpleList query={GET_WINES} />
              </ErrorBoundary>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Wines;
