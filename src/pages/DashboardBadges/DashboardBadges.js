import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import { BADGE_CATEGORY_ID } from '../../helpers/constants';
import { MemberBadgesOfCategory } from '../../components';
import { GET_MEMBER } from '../../graphql/queries';

import './DashboardBadges.scss';

/**
 * Renders DashboardBadges component.
 * */
const DashboardBadges = props => {

  const { meQuery } = props;
  const memberId = meQuery.me.id;

  return (
    <div className="DashboardBadges">
      <div className="DashboardBadges--container">
        {Object.entries(BADGE_CATEGORY_ID).map(([badgeCategoryId, badgeCategoryName]) => (
          <MemberBadgesOfCategory
            key={badgeCategoryId}
            badgeCategoryId={parseInt(badgeCategoryId, 10)}
            badgeCategoryName={badgeCategoryName}
            memberId={memberId}
          />
        ))}
      </div>
    </div>
  );
};

DashboardBadges.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' })
)(DashboardBadges);
