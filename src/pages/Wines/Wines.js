import React, { Component } from 'react';

import {
  ErrorBoundary,
  WineFilters,
  WineList,
  WineSorters,
} from '../../components';
import { GET_WINES } from '../../graphql/queries';

import './Wines.scss';

/**
 * Renders wine list page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Wines extends Component {
  static propTypes = {};

  static contextTypes = {};

  state = {
    filters: {
      year: null,
      wineClassId: null,
      wineTypeId: null,
      wineBodyId: null,
      wineSweetnessId: null,
      wineTanninId: null,
      wineStyleId: null,
      wineProductionMethodId: null,
      seasonId: null,
      tasteId: null,
      foodId: null,
      countryId: null,
    },
  };

  componentDidMount() {
  }

  handleFilters = filtersValue => {
    this.setState(prevState => (
      {
        filters: {
          ...prevState.filters,
          ...filtersValue,
        },
      }
    ));
  };

  render() {
    const { filters } = this.state;
    return (
      <div className="Wines">
        <section className="Wines--container">
          <div className="Wines_inner">

            <div className="Wines--filters">
              <ErrorBoundary>
                <WineFilters onFilterChanges={this.handleFilters} />
              </ErrorBoundary>
            </div>

            <div className="Wines--filters">
              <ErrorBoundary>
                <WineSorters onSorterChanges={this.handleFilters} />
              </ErrorBoundary>
            </div>

            <div className="Wines--list">
              <ErrorBoundary>
                <WineList query={GET_WINES} variables={filters} />
              </ErrorBoundary>
            </div>

          </div>
        </section>
      </div>
    );
  }
}

export default Wines;
