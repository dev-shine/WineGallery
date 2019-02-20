import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { MemberBadges, MemberProgress, SubscriptionSummary } from '../../components';
import { GET_MEMBER } from '../../graphql/queries';

import './Dashboard.scss';

/**
 * Renders Dashboard component.
 * */
const Dashboard = props => {
  const { meQuery } = props;
  return (
    <div className="Dashboard">
      <div className="Dashboard--container">
        <div className="Dashboard--forms">
          <h1 className="Dashboard--forms__title">Your Subscription</h1>
          <div className="Dashboard--forms__subscription-summary">
            <SubscriptionSummary data={meQuery} />
          </div>
        </div>
        <div className="Dashboard--stats">
          <div className="Dashboard--stats--progress">
            <MemberProgress me={meQuery.me} />
          </div>
          <div className="Dashboard--stats--badges">
            <MemberBadges me={meQuery.me} />
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' })
)(Dashboard);
