class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _setInputValidState = (input, errorElement) =>  {
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = ' ';
  }

  _setInputInvalidState(input, errorElement) {
    input.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#error-${input.id}`);
    if (input.validity.valid) {
      this._setInputValidState(input, errorElement);
    } else {
      this._setInputInvalidState(input, errorElement);
    }
  }

  _toggleButtonValidity() {
    if (this._formElement.checkValidity()) {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.setAttribute('disabled', '');
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._toggleButtonValidity();
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonValidity();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonValidity();
  }

  
}

const settings = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error-message'
};

const forms = document.querySelectorAll(settings.formSelector);
forms.forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
});

export {FormValidator};