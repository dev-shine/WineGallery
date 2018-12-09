/**
 * Group of functions used for validating forms in the front end
 * */

const checkMinLength = (value, min) => {
  if (typeof value === 'undefined' || value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return null;
};

const checkName = value => checkMinLength(value, 2);

const checkPassword = value => checkMinLength(value, 6);

const checkEmail = value => checkMinLength(value, 6);

export {
  checkEmail,
  checkMinLength,
  checkName,
  checkPassword,
};
