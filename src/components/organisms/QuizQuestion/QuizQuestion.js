import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './QuizQuestion.scss';

/**
 * Renders QuizQuestion component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class QuizQuestion extends Component {
  static propTypes = {
    maxAnswers: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired, description: PropTypes.string.isRequired,
    })).isRequired,
    selectedAnswers: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleAnswerSelectParent: PropTypes.func.isRequired,
  };

  handleAnswerSelection = event => {
    const { questionId, handleAnswerSelectParent, maxAnswers } = this.props;

    // Gets IDs of selected Answers
    const selectedAnswersIDs = [...event.target.options].filter(
      option => option.selected
    ).map(
      option => parseInt(option.value, 10)
    );

    // Propagates new change to parent if it's valid
    if (selectedAnswersIDs.length <= maxAnswers) {
      handleAnswerSelectParent(questionId, selectedAnswersIDs);
    }
  };

  render() {
    const { question, answers, selectedAnswers } = this.props;

    return (
      <div className="QuizQuestion">
        <div className="QuizQuestion--container">
          <div className="QuizQuestion--title">{question}</div>
          <select multiple value={selectedAnswers} onChange={this.handleAnswerSelection}>
            {answers.map(answer => (
              <option key={answer.id} value={answer.id}>{answer.description}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default QuizQuestion;
