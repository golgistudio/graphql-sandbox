import React from 'react';
import validator from 'validator';

import { Button, Dialog, TextField } from 'tfs-ui';

const checkInput = (inputValue, options) => {
  const errorMessages = {
    invalidEmail: 'Please enter a valid mail address',
    emptyInput: 'Email can not be empty',
    tooLong: 'Email is too long',
  };
  const retErrors = [];
  let invalid = false;

  let updatedInputValue = inputValue;

  if (options.cleanInput) {
    updatedInputValue = validator.trim(inputValue);
    const empty = validator.isEmpty(updatedInputValue);

    if (empty) {
      invalid = true;
      retErrors.push(errorMessages.emptyInput);
    }
  }

  if (options.checkEmail) {
    const validEmail = validator.isEmail(updatedInputValue);

    if (!validEmail) {
      invalid = true;
      retErrors.push(errorMessages.invalidEmail);
    }
  }

  if (options.checkLength && updatedInputValue) {
    const tooLong = updatedInputValue.length > options.maxChars;

    if (tooLong) {
      invalid = true;
      retErrors.push(errorMessages.tooLong);
    }
  }

  return {
    invalid,
    errors: retErrors,
    inputValue: updatedInputValue,
  };
};

class DialogDemo extends React.PureComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.getErrors = this.getErrors.bind(this);

    this.maxChars = 20;

    this.state = {
      visible: false,
      invalid: false,
      inputValue: null,
      errors: [],
    };
  }

  onClick() {
    this.setState(prevState => ({
      ...prevState,
      visible: true,
    }));
  }

  onClickCancel() {
    this.setState(prevState => ({
      ...prevState,
      visible: false,
      inputValue: null,
      errors: [],
    }));
  }

  onClickOk() {
    const { inputValue } = this.state;
    const inputStatus = checkInput(inputValue, {
      cleanInput: true,
      checkEmail: true,
      checkLength: true,
      maxChars: this.maxChars,
    });
    this.setState(prevState => ({
      ...prevState,
      visible: inputStatus.invalid,
      inputValue: inputStatus.inputValue,
      invalid: inputStatus.invalid,
      errors: inputStatus.errors,
    }));
  }

  onChange(evt) {
    const inputStatus = checkInput(evt.target.value, {
      cleanInput: false,
      checkEmail: false,
      checkLength: true,
      maxChars: this.maxChars,
    });
    this.setState(prevState => ({
      ...prevState,
      inputValue: inputStatus.inputValue,
      invalid: inputStatus.invalid,
      errors: inputStatus.errors,
    }));
  }

  onBlur(evt) {
    const inputStatus = checkInput(evt.target.value, {
      cleanInput: true,
      checkEmail: true,
      checkLength: true,
      maxChars: this.maxChars,
    });
    this.setState(prevState => ({
      ...prevState,
      inputValue: inputStatus.inputValue,
      invalid: inputStatus.invalid,
      errors: inputStatus.errors,
    }));
  }

  getErrors() {
    const { errors } = this.state;
    if (!errors || errors.length === 0) {
      return null;
    }

    const listItems = [];

    errors.forEach(item => {
      listItems.push(
        <li>
          {item}
        </li>);
    });

    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  render() {
    const inputStyle = {
      marginTop: '20px',
      textAlign: 'center',
    };

    const resultsContainerStyle = {
      marginTop: '20px',
      textAlign: 'center',
    };

    const resultsStyle = {
      marginTop: '5px',
      textAlign: 'center',
    };

    const { visible, invalid, inputValue } = this.state;

    return (
      <div>
        <Dialog
          headerChildren='Dialog title'
          onClickClose={this.onClickCancel}
          onClickCancel={this.onClickCancel}
          onClickOk={this.onClickOk}
          isOpen={visible}
          size='medium'
        >
          <div>
            <div>
              Enter in an email address 20 characters or less
            </div>

            <ul>
              <li>
                {'Valid email: nancy1@gmail.com'}
              </li>
              <li>
                {'Invalid input: abc123456789@gmail.com'}
              </li>
            </ul>
            <div style={inputStyle}>
              <TextField
                type='text'
                onChange={this.onChange}
                onBlur={this.onBlur}
                invalid={invalid}
                value={inputValue || ''}
              />
            </div>

            <div>
              {this.getErrors()}
            </div>
          </div>
        </Dialog>
        <Button
          type='primary'
          onClick={this.onClick}
        >
          Click to show Dialog
        </Button>

        {
          inputValue
            ? (
              <div style={resultsContainerStyle}>
                {'Dialog returned... '}
                <div style={resultsStyle}>
                  {'[ '}
                  {inputValue}
                  {' ]'}
                </div>
              </div>
            ) : null
        }
      </div>
    );
  }
}

export default DialogDemo;
