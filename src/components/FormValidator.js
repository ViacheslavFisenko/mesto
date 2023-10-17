class FormValidator {
    constructor({
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    }, formElement) {

        this._formElement = formElement;
        this._form = this._formElement;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);

    }

    _setInputValidState(input, errorElement) {
        input.classList.remove(this._inputErrorClass);
        errorElement.textContent = ' ';
    }

    _setInputInvalidState(input, errorElement) {
        input.classList.add(this._inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }

    _checkInputValidity(input) {
        const errorElement = this._formElement.querySelector(`#eror-${input.id}`);
        if (input.validity.valid) {
            this._setInputValidState(input, errorElement);
        }
        else {
            this._setInputInvalidState(input, errorElement);
        }
    }

    _disableButton() {
        this._submitButton.setAttribute('disabled', '');
        this._submitButton.classList.add(this._inactiveButtonClass);
    }

    _enableButton() {
        this._submitButton.removeAttribute('disabled');
        this._submitButton.classList.remove(this._inactiveButtonClass);
    }

    toggleButtonValidity() {

        if (this._form.checkValidity()) { // Используем this._form
            this._enableButton(); // Вызывает метод _enableButton
        } else {
            this._disableButton(); // Вызывает метод _disableButton
        }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.toggleButtonValidity();
        });

        this.toggleButtonValidity();

        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.toggleButtonValidity();
            });
        });
    }

    resetValidationState() {
        this._inputList.forEach((input) => {
            this._setInputValidState(input, input.nextElementSibling);
        });

        this.toggleButtonValidity();
    }
}

export { FormValidator }
