import React, { Component } from 'react';

import './Quiz.scss';

/**
 * Renders Quiz component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Quiz extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <div className="Quiz">
        This is the Quiz component!
      </div>
    );
  }
}

export default Quiz;
