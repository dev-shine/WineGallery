import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputField.scss';

/**
 * Renders Input field component for a form with label and validation.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class InputField extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onKeyPress: PropTypes.func,
    validations: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    hint: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    value: '',
    validations: [],
    placeholder: '',
    onChange: null,
    onKeyPress: null,
    hint: '',
  };

  state = { errorText: [], inputValue: '' };

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      inputValue: value,
    });
  }

  /**
   * Assigns value from the input field to the state and passes value and field name up to parent component
   * @param event
   * */
  handleChange = event => {
    const { onChange, name } = this.props;
    const { value } = event.target;
    this.setState({ inputValue: event.target.value });
    onChange(name, value);
  };

  /**
   * Controls error in the input based on validation rules received from component declaration
   * @param event
   * */
  handleValidation = event => {
    const { validations } = this.props;
    const { value } = event.target;
    for (let index = 0; index < validations.length; index++) {
      const validation = validations[index];
      this.setState({ errorText: validation(value) });
    }
  };

  render() {
    const { errorText, inputValue } = this.state;
    const {
      label,
      type,
      hint,
      onKeyPress,
      placeholder,
      name,
      id,
    } = this.props;

    return (
      <div className="InputField">
        <label id={`${id}Label`} htmlFor="birthDate">
          <span>{label}</span>
          <input
            id={id}
            name={name}
            type={type}
            value={type === 'email' ? inputValue.toLowerCase() : inputValue}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            onChange={this.handleChange}
            onBlur={this.handleValidation}
          />
        </label>
        <div className="hint">{hint}</div>
        {errorText && <div className="error">{errorText}</div>}
      </div>
    );
  }
}

export default InputField;
