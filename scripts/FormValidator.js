import { formValidator } from "./index.js";

class FormValidator {
    constructor({
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    }) {
        this.formSelector = formSelector;
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
        const errorElement = document.querySelector(`#eror-${input.id}`);
        if (input.validity.valid) {
            this.setInputValidState(input, errorElement);
        }
        else {
            this.setInputInvalidState(input, errorElement);
        }
    }

    disableButton(form) {
        const submitButton = form.querySelector(this.submitButtonSelector);
        submitButton.setAttribute('disabled', '');
        submitButton.classList.add(this.inactiveButtonClass);
    }

    enableButton(form) {
        const submitButton = form.querySelector(this.submitButtonSelector);
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(this.inactiveButtonClass);
    }

    toggleButtonValidity(form) {
        if (form.checkValidity()) {
            this.enableButton(form); // Вызывает метод enableButton
        } else {
            this.disableButton(form); // Вызывает метод disableButton
        }
    }

    enableValidation() {
        const forms = document.querySelectorAll(this.formSelector);
        const formsArray = Array.from(forms);
        formsArray.forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.toggleButtonValidity(form);
            });

            this.toggleButtonValidity(form);

            const inputs = form.querySelectorAll(this.inputSelector);
            const inputsArray = Array.from(inputs);
            inputsArray.forEach((input) => {
                input.addEventListener('input', () => {
                    this.checkInputValidity(input);
                    this.toggleButtonValidity(form);
                });
            });
        });
    }
}

export { FormValidator }
