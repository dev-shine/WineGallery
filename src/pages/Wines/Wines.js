import React, { Component } from 'react';

import ErrorBoundary from '../../Helpers/ErrorBoundary';
import { SimpleList } from '../../components';
import GET_WINES from '../../graphql/queries';

import './Wines.scss';


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
