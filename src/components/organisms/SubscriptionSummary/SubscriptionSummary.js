import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import urlPatterns from '../../../urls';
import { SUBSCRIPTION_STATUS, SUBSCRIPTION_STATUS_ID } from '../../../helpers/constants';

import './SubscriptionSummary.scss';

/**
 * Renders SubscriptionSummary component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
const SubscriptionSummary = props => {
  const { data } = props;
  const { subscription } = data.me;
  if (data.loading) return (<div>Loading...</div>);

  return (
    <div className="SubscriptionSummary">
      <div className="SubscriptionSummary--container">
        <div>
          <div>Your subscription status:</div>
          {subscription ? (
            <div>
              <h3
                className={
                  `SubscriptionStatus--status ${subscription.subscriptionStatus.id
                  && SUBSCRIPTION_STATUS_ID[subscription.subscriptionStatus.id].toLowerCase()}`
                }
              >
                {subscription.subscriptionStatus.name}
              </h3>
              {
                subscription.subscriptionStatus.name === SUBSCRIPTION_STATUS.PAUSE
                && (
                  <span>{`Until ${subscription.holdUntilDate}`}</span>
                )
              }
              {
                subscription.monthFrequency && subscription.monthFrequency > 1
                && (
                  <span>{`delivered every ${subscription.monthFrequency} months`}</span>
                )
              }
            </div>
          ) : (
            <div>Not Subscribed YetÒ</div>
          )}
        </div>
        <div>
          {subscription ? subscription.pastMonthMonthLabel : 'Last Month'}
          <br />
          {subscription ? subscription.pastMonthStatus : '--'}
          <br />
          {
            subscription && subscription.canPastMonthWinesBeChanged ? (
              <Link to={urlPatterns.WINES_BOX}>change wines</Link>
            ) : (

              // TODO [DEV-216] Change this link to the order page
              <Link to={urlPatterns.WINES_BOX}>view</Link>
            )
          }

        </div>
        <div>
          {subscription ? subscription.nextMonthMonthLabel : 'Next Month'}
          <br />
          {subscription ? subscription.nextMonthStatus.replace(/(<([^>]+)>)/ig, '') : '--'}
          <br />
          <br />
          {
            subscription && !subscription.canPastMonthWinesBeChanged ? (
              <Link to={urlPatterns.WINES_BOX}>change wines</Link>
            ) : (

              <div> -- </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

SubscriptionSummary.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default SubscriptionSummary;
