import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector(".popup__content");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }


  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this._submitCallback(formData);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
