// валидация

const setInputValidState = ({ inputErrorClass }, input, erorElement) => {
  input.classList.remove(inputErrorClass)
  erorElement.textContent = ' '
}

const setInputInvalidState = ({ inputErrorClass }, input, erorElement) => {
  input.classList.add(inputErrorClass)
  erorElement.textContent = input.validationMessage
}

const checkImputValidity = (rest, input) => {
  const erorElement = document.querySelector(`#eror-${input.id}`)
  //валидный
  if (input.validity.valid) {
    setInputValidState(rest, input, erorElement)
    //невалидный
  } else {
    setInputInvalidState(rest, input, erorElement)
  }
}

const disableButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', '')
  button.classList.add(inactiveButtonClass)
}

const enableButton = (inactiveButtonClass, button) => {
  button.removeAttribute('disabled')
  button.classList.remove(inactiveButtonClass)
}

const toggleButtonValidity = ({ submitButtonSelector, inactiveButtonClass }, form) => {
  const submitButton = form.querySelector(submitButtonSelector)
  if (form.checkValidity()) {
    enableButton(inactiveButtonClass, submitButton)
  } else {
    disableButton(inactiveButtonClass, submitButton)
  }
}

const enableValidation = ({ formSelector, inputSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector) //присваиваю переменную всем формам в документе
  const formsArray = Array.from(forms) //создал псевдо массив форм

  //перебрал псевдомассив форм, нашел там кнопки отправки и отключил их настройки.
  formsArray.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      toggleButtonValidity(rest, form)
    })

    toggleButtonValidity(rest, form)

    //перебрал псевдомассив импутов, нашел там все импуты и добавил валидацию на каждый импут.
    const imputs = form.querySelectorAll(inputSelector) //присваиваю переменную всем импутам
    const imputsArray = Array.from(imputs) //создал псевдо массив импутов
    imputsArray.forEach((input) => {
      input.addEventListener('input', () => {
        checkImputValidity(rest, input)
        toggleButtonValidity(rest, form)
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__eror-message'
}); 