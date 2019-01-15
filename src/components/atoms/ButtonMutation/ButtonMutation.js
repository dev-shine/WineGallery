import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import './ButtonMutation.scss';

/**
 * Renders ButtonMutation component.
 * Generic component for a button with mutation.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class ButtonMutation extends Component {
  static propTypes = {
    input: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired,
    mutationProp: PropTypes.shape({}).isRequired,
    reFetchQueriesProp: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    reFetchQueriesProp: [],
  };

  /**
   * Triggers mutation passing "input" from props.
   * @param mutationMethod: mutation client
   * */
  handleButtonClicked = mutationMethod => {
    const { input } = this.props;
    mutationMethod({ variables: { input } });
  };

  render() {
    const { reFetchQueriesProp, mutationProp, label } = this.props;

    return (
      <div className="ButtonMutation">
        <Mutation
          mutation={mutationProp}
          refetchQueries={() => reFetchQueriesProp}
        >
          {(mutationMethod, { loading, error }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <button
                type="button"
                onClick={
                  () => this.handleButtonClicked(mutationMethod)
                }
              >
                {label}
              </button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default ButtonMutation;
