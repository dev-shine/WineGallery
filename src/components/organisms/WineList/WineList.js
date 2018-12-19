import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { WineItems } from '../..';

import './WineList.scss';

/**
 * Renders list container with title
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineList extends Component {
  static propTypes = {
    query: PropTypes.shape(),
    variables: PropTypes.shape(),
  };

  static defaultProps = {
    query: null,
    variables: null,
  };

  render() {
    const { query, variables } = this.props;

    return (
      <div className="SimpleList">
        <h1>Wines</h1>

        {/* Queries wine list from database */}
        <Query query={query} variables={variables}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (

              // MOLECULE
              <WineItems data={data} />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default WineList;
