import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { ADD_SHOPPING_CART_ITEM, SIGN_UP } from '../../graphql/mutations';
import {
  checkEmail,
  checkName,
  checkPassword,
  checkServerValidation,
} from '../../helpers/validations';
import { shoppingCartLocalStorage } from '../../helpers/tools';
import InputField from '../../components/atoms/InputField/InputField';

import './SignUp.scss';

/**
 * Renders sign up page
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SignUp extends Component {
  state = {
    errors: [],
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: '',
      confirmPassword: '',
    },
  };

  /**
   * Assigns new values to 'this.state.form' properties
   * @param value
   * @param field
   * */
  handleChange = (field, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [field]: value } });
  };

  /**
   * Sends sign up request to GraphQL mutation and log results in the browser
   * On successful sign up it saves local storage shopping cart item to database
   * @param signUp
   * @param addShoppingCart
   * @return {Promise<void>}
   * */
  handleSubmit = async (signUp, addShoppingCart) => {
    const { state } = this;
    const shoppingCart = shoppingCartLocalStorage();

    // Creates an array (signUpInput) removing unnecessary info
    const { confirmPassword, ...signUpInput } = state.form;

    if (confirmPassword === signUpInput.password) {

      // Saves new member (signup)
      await signUp({ variables: { input: { ...signUpInput } } })
        .then(member => {

          // Checks if user has added items to local storage shopping cart
          if (shoppingCart) {

            // Creates shopping cart in database with local storage item
            shoppingCart.items.length
            && shoppingCart.items.map(item => addShoppingCart({
              variables:
                {
                  input:
                    {
                      memberId: member.data.signUp.id,
                      productId: item.product.id,
                      quantity: item.quantity,
                    },
                },
            }).then(

              //  Deletes shopping cart from local storage
              window.localStorage.removeItem('shoppingCart')
            ));
          }
        });
    } else {
      this.setState({ errors: ['Sorry, your passwords do not match.'] });
    }
  };

  render() {
    const { state } = this;
    const { errors } = state;
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      confirmPassword,
    } = state.form;

    return (
      <Mutation mutation={ADD_SHOPPING_CART_ITEM}>
        {(addShoppingCart, { loading: loadingAddShoppingCart, error: errorAddShoppingCart }) => {
          if (loadingAddShoppingCart) return 'Loading...';
          if (errorAddShoppingCart) console.log('Non-friendly error message', errorAddShoppingCart.message);

          return (
            <Mutation mutation={SIGN_UP}>
              {(signUp, { data, error, loading }) => {
                if (loading) return 'Loading...';
                if (error) console.log('Non-friendly error message', error.message);

                return (
                  <div className="SignUp">
                    <div className="SignUp--container">
                      <h1 className="SignUp--forms__title">SignUp</h1>
                      <div className="SignUp--forms__form">
                        <InputField
                          label="First Name"
                          placeholder="First Name"
                          name="firstName"
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={this.handleChange}
                          validations={[checkName]}
                          serverValidation={data && checkServerValidation(data, 'signUp', 'first_name')}
                        />
                        <InputField
                          label="Last Name"
                          placeholder="Last Name"
                          name="lastName"
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={this.handleChange}
                          validations={[checkName]}
                          serverValidation={data && checkServerValidation(data, 'signUp', 'last_name')}
                        />
                        <InputField
                          label="Email"
                          placeholder="Email"
                          name="email"
                          id="email"
                          type="email"
                          value={email}
                          onChange={this.handleChange}
                          validations={[checkEmail]}
                          serverValidation={data && checkServerValidation(data, 'signUp', 'email')}
                        />
                        <InputField
                          label="Date of birth"
                          name="birthDate"
                          id="birthDate"
                          type="date"
                          value={birthDate}
                          onChange={this.handleChange}
                          serverValidation={data && checkServerValidation(data, 'signUp', 'birth_date')}
                        />
                        <InputField
                          label="Password"
                          placeholder="Password"
                          name="password"
                          id="password"
                          type="password"
                          value={password}
                          onChange={this.handleChange}
                          validations={[checkPassword]}
                        />
                        <InputField
                          label="Confirm the password"
                          placeholder="Confirm the password"
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={this.handleChange}
                        />
                        {errors && <span>{errors[0]}</span>}
                        <button onClick={() => this.handleSubmit(signUp, addShoppingCart)} type="button">
                          submit
                        </button>
                      </div>
                      <div className="SignUp--forms_social">
                        <h2>GraphQL Server Response</h2>

                        {/* Prints in the screen error message from server */}
                        {/* TODO: DEV-107 Add validation  */}
                        {data && data.signUp && data.signUp.errors && (
                          <div>
                            {data.signUp.errors.map(inputError => (
                              <p key={inputError.field}>
                                {`${inputError.field}: ${inputError.messages[0]}`}
                              </p>
                            ))}
                          </div>
                        )}
                        {errors && <div>{errors}</div>}

                        {/* Prints in the screen response from server in case it succeeds */}
                        {data && data.signUp.id && (
                          <div>
                            <div>
                              <p>Success direct from graphql:</p>
                              <span>{`id: ${data.signUp.id}`}</span>
                              <br />
                              <span>{`name: ${data.signUp.firstName}`}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              }
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;
