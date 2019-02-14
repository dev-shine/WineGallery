import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { SubscriptionSummary } from '../../components';
import { GET_MEMBER } from '../../graphql/queries';

import './Dashboard.scss';

/**
 * Renders Dashboard component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Dashboard extends Component {
  static propTypes = {
    meQuery: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { meQuery } = this.props;
    return (
      <div className="Dashboard">
        <div className="Dashboard--container">
          <div className="Dashboard--forms">
            <h1 className="Dashboard--forms__title">Your Subscription</h1>
            <div className="Dashboard--forms__subscription-summary">
              <SubscriptionSummary data={meQuery} />
            </div>
          </div>
        </div>
        This is the Dashboard component!
      </div>
    );
  }
}

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' })
)(Dashboard);
