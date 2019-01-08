import React, { Component } from 'react';

import { Query, Mutation } from 'react-apollo';

import { GET_QUIZ_QUESTIONS } from '../../graphql/queries';
import { checkEmail } from '../../helpers/validations';
import { SUBMIT_QUIZ } from '../../graphql/mutations';
import { isLoggedIn, setLocalStorageToken } from '../../helpers/auth';

import { InputField, QuizQuestion } from '../../components';

import './Quiz.scss';

/**
 * Renders Quiz component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Quiz extends Component {
  static propTypes = {};

  state = {
    selectedAnswers: {}, // eg. { questionId: [selectedAnswer1, selectedAnswer2] }
    email: null,
  };

  handleAnswerSelect = (questionID, selectedAnswersIDs) => {
    const { selectedAnswers } = this.state;
    this.setState({ selectedAnswers: { ...selectedAnswers, [questionID]: selectedAnswersIDs } });
  };

  handleSubmitQuiz = submitQuiz => {
    const { state } = this;
    const { selectedAnswers, email } = state;
    const selectedAnswersAsArray = Object.values(selectedAnswers).flat();

    // Auth data required for user authentication
    const authData = {
      clientId: `${process.env.REACT_APP_CLIENT_ID}`,
      clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    };

    submitQuiz(
      { variables: { input: { answersIds: selectedAnswersAsArray, email, ...authData } } }
    ).then(
      ({ data }) => {
        if (data && data.submitQuiz.isSuccessful && data.submitQuiz.accessToken) {
          setLocalStorageToken(
            data.submitQuiz.accessToken, data.submitQuiz.refreshToken, email,
          );
        }

        // TODO: DEV-135 navigate to the Quiz Results page
        window.location = `${process.env.REACT_APP_BASE_URL}/home`;
      }
    );
  };

  render() {
    const { selectedAnswers } = this.state;

    return (
      <div className="Quiz">
        <div className="Quiz--container">
          <Query query={GET_QUIZ_QUESTIONS}>
            {({ loading, error, data }) => {

              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              // Quiz is valid if every question has at least one answer
              const isQuizValid = (
                Object.values(selectedAnswers).every(selected => selected.length > 0)
                && Object.keys(selectedAnswers).length === data.quizQuestions.length
              );


              return (
                <Mutation mutation={SUBMIT_QUIZ}>
                  { submitQuiz => (
                    <div className="Quiz--form">
                      {data.quizQuestions.map(quizQuestion => (
                        <QuizQuestion
                          key={quizQuestion.id}
                          question={quizQuestion.description}
                          answers={quizQuestion.quizanswerSet}
                          maxAnswers={quizQuestion.maxAnswers}
                          selectedAnswers={selectedAnswers[quizQuestion.id] || []}
                          handleAnswerSelectParent={this.handleAnswerSelect}
                          questionId={quizQuestion.id}
                        />
                      ))}

                      {
                        isLoggedIn() // Renders email input for new users only
                          ? null
                          : (
                            <div className="Quiz--form-input">
                              <InputField
                                label="Email"
                                placeholder="Email"
                                name="email"
                                id="email"
                                type="email"
                                onChange={(field, value) => this.setState({ [field]: value })}
                                validations={[checkEmail]}
                              />
                            </div>
                          )
                      }

                      <button
                        onClick={() => this.handleSubmitQuiz(submitQuiz)}
                        type="button"
                        disabled={!isQuizValid}
                      >
                        submit
                      </button>

                    </div>
                  )}
                </Mutation>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Quiz;
