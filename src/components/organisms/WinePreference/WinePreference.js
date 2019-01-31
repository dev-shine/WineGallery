import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GET_MEMBER } from '../../../graphql/queries';
import { UPDATE_WINE_PREFERENCE } from '../../../graphql/mutations';
import { ButtonMutation } from '../..';

import './WinePreference.scss';

const INITIAL_BOTTLES = {
  redBottles: 2,
  whiteBottles: 1,
  roseBottles: 0,
  sparklingBottles: 0,
};

/**
 * Renders WinePreference component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WinePreference extends Component {
  static propTypes = {
    winePreference: PropTypes.shape({}),
  };

  static defaultProps = {
    winePreference: null,
  };

  state = {
    errorMessage: null,
  };

  /**
   * Decreases the quantity of bottles
   * @param value
   * @return {number}
   * */
  handleDecreaseBottle = value => {
    let newValue = value || 0;
    if (newValue !== 0) {
      newValue = value - 1;
    }
    return newValue;
  };

  handleSetErrors = error => {
    this.setState({ errorMessage: error });
  };

  render() {
    const { errorMessage } = this.state;
    const { winePreference } = this.props;
    const { __typename, id, ...cleanWinePreference } = winePreference.winepreference || { __typename: null };
    const winePreferenceDefault = cleanWinePreference.redBottles ? cleanWinePreference : INITIAL_BOTTLES;
    const memberId = winePreference.id;

    const totalBottles = (
      winePreferenceDefault.redBottles + winePreferenceDefault.roseBottles
      + winePreferenceDefault.whiteBottles + winePreferenceDefault.sparklingBottles
    );

    return (
      <div className="WinePreference">
        <h2>Wine Preferences</h2>
        { errorMessage && errorMessage }
        <div className="WinePreference--container">
          <div className="WinePreference--bottle">
            <h3>Red Bottles</h3>
            <div className="WinePreference--bottle--counter">
              <ButtonMutation
                label="-"
                disabled={winePreferenceDefault.redBottles < 1}
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  redBottles: this.handleDecreaseBottle(winePreferenceDefault.redBottles),
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                mutationPayloadName="updateMemberWinePreference"
                handleShowErrors={this.handleSetErrors}
                onClick={() => this.setState({ errorMessage: null })}
              />
              <div>{winePreferenceDefault.redBottles}</div>
              <ButtonMutation
                label="+"
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  redBottles: (parseInt(winePreferenceDefault.redBottles, 10) + 1),
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                onClick={() => this.setState({ errorMessage: null })}
              />
            </div>
          </div>

          <div className="WinePreference--bottle">
            <h3>White Bottles</h3>
            <div className="WinePreference--bottle--counter">
              <ButtonMutation
                label="-"
                disabled={winePreferenceDefault.whiteBottles < 1}
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  whiteBottles: this.handleDecreaseBottle(winePreferenceDefault.whiteBottles),
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                mutationPayloadName="updateMemberWinePreference"
                handleShowErrors={this.handleSetErrors}
                onClick={() => this.setState({ errorMessage: null })}
              />
              <div>{winePreferenceDefault.whiteBottles}</div>
              <ButtonMutation
                label="+"
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  whiteBottles: winePreferenceDefault.whiteBottles + 1,
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                onClick={() => this.setState({ errorMessage: null })}
              />
            </div>
          </div>

          <div className="WinePreference--bottle">
            <h3>Rose Bottles</h3>
            <div className="WinePreference--bottle--counter">
              <ButtonMutation
                label="-"
                disabled={winePreferenceDefault.redBottles < 1}
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  roseBottles: this.handleDecreaseBottle(winePreferenceDefault.roseBottles),
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                mutationPayloadName="updateMemberWinePreference"
                handleShowErrors={this.handleSetErrors}
                onClick={() => this.setState({ errorMessage: null })}
              />
              <div>{winePreferenceDefault.roseBottles}</div>
              <ButtonMutation
                label="+"
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  roseBottles: winePreferenceDefault.roseBottles + 1,
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                onClick={() => this.setState({ errorMessage: null })}
              />
            </div>
          </div>

          <div className="WinePreference--bottle">
            <h3>Sparkling Bottles</h3>
            <div className="WinePreference--bottle--counter">
              <ButtonMutation
                label="-"
                mutationProp={UPDATE_WINE_PREFERENCE}
                disabled={winePreferenceDefault.sparklingBottles < 1}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  sparklingBottles: this.handleDecreaseBottle(winePreferenceDefault.sparklingBottles),
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                mutationPayloadName="updateMemberWinePreference"
                handleShowErrors={this.handleSetErrors}
                onClick={() => this.setState({ errorMessage: null })}
              />
              <div>{winePreferenceDefault.sparklingBottles}</div>
              <ButtonMutation
                label="+"
                mutationProp={UPDATE_WINE_PREFERENCE}
                input={{
                  ...winePreferenceDefault,
                  memberId,
                  sparklingBottles: winePreferenceDefault.sparklingBottles + 1,
                }}
                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                onClick={() => this.setState({ errorMessage: null })}
              />
            </div>
          </div>
          <div className="WinePreference--bottle">
            <h3>Total Bottles</h3>
            {totalBottles}
          </div>
        </div>
      </div>
    );
  }
}

export default WinePreference;
