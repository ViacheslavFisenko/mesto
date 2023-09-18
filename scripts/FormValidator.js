class FormValidator {
    constructor({
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    }, formElement) {
        this.formElement = formElement;
        this.form = formElement.querySelector(formSelector); // Находим форму внутри formElement
        this.inputSelector = inputSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.inactiveButtonClass = inactiveButtonClass;
        this.inputErrorClass = inputErrorClass;
        this.errorClass = errorClass;

        this.enableValidation();
    }

    setInputValidState(input, errorElement) {
        input.classList.remove(this.inputErrorClass);
        errorElement.textContent = ' ';
    }

    setInputInvalidState(input, errorElement) {
        input.classList.add(this.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }

    checkInputValidity(input) {
        const errorElement = this.formElement.querySelector(`#eror-${input.id}`);
        if (input.validity.valid) {
            this.setInputValidState(input, errorElement);
        }
        else {
            this.setInputInvalidState(input, errorElement);
        }
    }

    disableButton() {
        const submitButton = this.formElement.querySelector(this.submitButtonSelector);
        submitButton.setAttribute('disabled', '');
        submitButton.classList.add(this.inactiveButtonClass);
    }

    enableButton() {
        const submitButton = this.formElement.querySelector(this.submitButtonSelector);
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(this.inactiveButtonClass);
    }

    toggleButtonValidity() {
        if (this.form.checkValidity()) { // Используем this.form
            this.enableButton(); // Вызывает метод enableButton
        } else {
            this.disableButton(); // Вызывает метод disableButton
        }
    }

    enableValidation() {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.toggleButtonValidity();
        });

        this.toggleButtonValidity();

        const inputs = this.formElement.querySelectorAll(this.inputSelector);
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this.checkInputValidity(input);
                this.toggleButtonValidity();
            });
        });
    }

    resetError() {
        const inputs = this.formElement.querySelectorAll(this.inputSelector);
        inputs.forEach((input) => {
            this.setInputValidState(input, input.nextElementSibling);
        });

        this.toggleButtonValidity();
    }
}

export { FormValidator }
