export const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error-message'
}

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'a1141784-64c6-4595-a681-05c051f7ce45'
    }
}