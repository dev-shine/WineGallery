import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query, compose, graphql } from 'react-apollo';
import { GET_MEMBER, GET_QUIZ_QUESTIONS, GET_REFERRAL_DISCOUNT } from '../../graphql/queries';
import { SET_MEMBER_AUTH } from '../../graphql/resolvers/auth';
import { SUBMIT_QUIZ } from '../../graphql/mutations';
import { FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';
import { checkEmail } from '../../helpers/validations';
import { isLoggedIn, setLocalStorageToken } from '../../helpers/auth';
import urlPatterns from '../../urls';
import { SET_REFERRAL_DISCOUNT } from '../../graphql/resolvers/member';

import { InputField, QuizQuestion } from '../../components';

import './Quiz.scss';

/**
 * Renders Quiz component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Quiz extends Component {
  static propTypes = {
    setMemberAuth: PropTypes.func.isRequired,
    submitQuiz: PropTypes.func.isRequired,
    referralDiscountQuery: PropTypes.shape({}).isRequired,
    setReferralDiscount: PropTypes.func.isRequired,
  };

  state = {
    selectedAnswers: {}, // eg. { questionId: [selectedAnswer1, selectedAnswer2] }
    email: null,
  };

  handleAnswerSelect = (questionID, selectedAnswersIDs) => {
    const { selectedAnswers } = this.state;
    this.setState({ selectedAnswers: { ...selectedAnswers, [questionID]: selectedAnswersIDs } });
  };

  handleSubmitQuiz = () => {
    const {
      setMemberAuth,
      submitQuiz,
      referralDiscountQuery,
      setReferralDiscount,
    } = this.props;
    const { selectedAnswers, email } = this.state;
    const selectedAnswersAsArray = Object.values(selectedAnswers).flat();

    // Auth data required for user authentication
    const authData = {
      clientId: `${process.env.REACT_APP_CLIENT_ID}`,
      clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    };

    // Gets referral and giveaway codes from apollo-link-state
    const { referralCode, giveawayCode } = referralDiscountQuery.referralDiscount;

    submitQuiz(
      {
        variables: {
          input: {
            answersIds: selectedAnswersAsArray, email, ...authData, referralCode, giveawayCode,
          },
        },
      }
    ).then(
      async ({ data }) => {
        if (data && data.submitQuiz.isSuccessful && data.submitQuiz.accessToken) {

          // Removes referral discount from the apollo-link-state as it's been saved in the database
          // by the submitQuiz mutation
          await setReferralDiscount({
            variables: {
              referralCode: null,
              giveawayCode: null,
            },
          });

          await setMemberAuth({
            variables: {
              memberId: data.submitQuiz.memberId,
              token: localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE),
            },
          })
            .catch(errorMutation => {
              console.error(errorMutation);
            });

          await setLocalStorageToken(
            data.submitQuiz.accessToken, data.submitQuiz.refreshToken, email,
          );
        }

        // Navigates to the Quiz Results page for new users
        window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.QUIZ_RESULTS}`;
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
                && Object.keys(selectedAnswers).length === data.allQuizQuestions.length
              );

              return (
                <div className="Quiz--form">
                  {data.allQuizQuestions.map(quizQuestion => (
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
                    onClick={() => this.handleSubmitQuiz()}
                    type="button"
                    disabled={!isQuizValid}
                  >
                    submit
                  </button>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(SUBMIT_QUIZ, {
    name: 'submitQuiz',
    options: { refetchQueries: () => [{ query: GET_MEMBER }] },
  }),
  graphql(
    GET_REFERRAL_DISCOUNT, {
      name: 'referralDiscountQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(SET_MEMBER_AUTH, { name: 'setMemberAuth' }),
  graphql(SET_REFERRAL_DISCOUNT, { name: 'setReferralDiscount' }),
)(Quiz);
