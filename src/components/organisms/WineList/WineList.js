import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { GET_WINES } from '../../../graphql/queries';
import { WineItems } from '../..';

import './WineList.scss';

/**
 * Renders list container with title
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineList extends Component {
  static propTypes = {
    variables: PropTypes.shape(),
  };

  static defaultProps = {
    variables: null,
  };

  render() {
    const { variables } = this.props;

    return (
      <div className="SimpleList">
        <h1>Wines</h1>
        <Query query={GET_WINES} variables={variables}>
          {({ loading: loadingWines, error: errorWines, data: { allWines } }) => {
            if (loadingWines) return 'Loading...';
            if (errorWines) return `Error! ${errorWines.message}`;
            return (

              // MOLECULE
              <WineItems data={allWines} />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default WineList;
