import gql from 'graphql-tag';

/**
 * QUERIES
 * */

export const GET_QUIZ_QUESTIONS = gql`
  query QuizQuestions {
    quizQuestions {
      id
      description
      maxAnswers
      quizanswerSet {
        id
        description
        photoUrl
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
