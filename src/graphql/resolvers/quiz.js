import gql from 'graphql-tag';

/**
 * QUERIES
 * */

export const GET_QUIZ_QUESTIONS = gql`
  query AllQuizQuestions {
    allQuizQuestions {
      id
      description
      maxAnswers
      quizVersion {
        id
      }
      quizanswerSet {
        id
        description
        graphicalIdentifier
        quizAnswerCategory {
          id
        }
      }
    }
  }
`;

/**
 * MUTATIONS
 * */

export const SUBMIT_QUIZ = gql`
  mutation SubmitQuiz($input: SubmitQuizInput!) {
    submitQuiz(input: $input) {
      isSuccessful
      accessToken
      refreshToken
      memberId
      errors {
        messages
        field
      }
    }
  }
`;
