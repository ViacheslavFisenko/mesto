/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/Card.js":
/*!*****************************!*\
  !*** ./src/scripts/Card.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Card = /*#__PURE__*/function () {
  function Card(cardData, templateSelector, handleCardClick) {
    _classCallCheck(this, Card);
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _createClass(Card, [{
    key: "_getTemplate",
    value: function _getTemplate() {
      var cardElement = document.querySelector(this._templateSelector).content.querySelector(".place").cloneNode(true);
      return cardElement;
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;
      this._element.querySelector(".place__like").addEventListener("click", this._handleLikeClick.bind(this));
      this._element.querySelector(".place__delete").addEventListener("click", this._handleDeleteClick.bind(this));
      this._element.querySelector(".place__image").addEventListener("click", function () {
        _this._handleCardClick(_this._name, _this._link);
      });
    }
  }, {
    key: "_handleLikeClick",
    value: function _handleLikeClick() {
      var likeButton = this._element.querySelector(".place__like");
      likeButton.classList.toggle("place__like-img_active");
    }
  }, {
    key: "_handleDeleteClick",
    value: function _handleDeleteClick() {
      this._element.remove();
    }
  }, {
    key: "_createCard",
    value: function _createCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector(".place__title").textContent = this._name;
      this._element.querySelector(".place__image").src = this._link;
      this._element.querySelector(".place__image").alt = this._name;
      return this._element;
    }
  }]);
  return Card;
}();

/***/ }),

/***/ "./src/scripts/FormValidator.js":
/*!**************************************!*\
  !*** ./src/scripts/FormValidator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormValidator: () => (/* binding */ FormValidator)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FormValidator = /*#__PURE__*/function () {
  function FormValidator(_ref, formElement) {
    var formSelector = _ref.formSelector,
      inputSelector = _ref.inputSelector,
      submitButtonSelector = _ref.submitButtonSelector,
      inactiveButtonClass = _ref.inactiveButtonClass,
      inputErrorClass = _ref.inputErrorClass,
      errorClass = _ref.errorClass;
    _classCallCheck(this, FormValidator);
    this.formElement = formElement;
    this.form = this.formElement;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
    this.submitButton = this.formElement.querySelector(this.submitButtonSelector);
    this.inputList = this.formElement.querySelectorAll(this.inputSelector);
  }
  _createClass(FormValidator, [{
    key: "setInputValidState",
    value: function setInputValidState(input, errorElement) {
      input.classList.remove(this.inputErrorClass);
      errorElement.textContent = ' ';
    }
  }, {
    key: "setInputInvalidState",
    value: function setInputInvalidState(input, errorElement) {
      input.classList.add(this.inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }
  }, {
    key: "checkInputValidity",
    value: function checkInputValidity(input) {
      var errorElement = this.formElement.querySelector("#eror-".concat(input.id));
      if (input.validity.valid) {
        this.setInputValidState(input, errorElement);
      } else {
        this.setInputInvalidState(input, errorElement);
      }
    }
  }, {
    key: "disableButton",
    value: function disableButton() {
      this.submitButton.setAttribute('disabled', '');
      this.submitButton.classList.add(this.inactiveButtonClass);
    }
  }, {
    key: "enableButton",
    value: function enableButton() {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.remove(this.inactiveButtonClass);
    }
  }, {
    key: "toggleButtonValidity",
    value: function toggleButtonValidity() {
      if (this.form.checkValidity()) {
        // Используем this.form
        this.enableButton(); // Вызывает метод enableButton
      } else {
        this.disableButton(); // Вызывает метод disableButton
      }
    }
  }, {
    key: "enableValidation",
    value: function enableValidation() {
      var _this = this;
      this.formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        _this.toggleButtonValidity();
      });
      this.toggleButtonValidity();
      this.inputList.forEach(function (input) {
        input.addEventListener('input', function () {
          _this.checkInputValidity(input);
          _this.toggleButtonValidity();
        });
      });
    }
  }, {
    key: "resetError",
    value: function resetError() {
      var _this2 = this;
      this.inputList.forEach(function (input) {
        _this2.setInputValidState(input, input.nextElementSibling);
      });
      this.toggleButtonValidity();
    }
  }]);
  return FormValidator;
}();


/***/ }),

/***/ "./src/scripts/Popup.js":
/*!******************************!*\
  !*** ./src/scripts/Popup.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Popup: () => (/* binding */ Popup)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    _classCallCheck(this, Popup);
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "close",
    value: function close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "_handleEscClose",
    value: function _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;
      this._popup.addEventListener('click', function (event) {
        if (event.target.classList.contains('popup__close') || event.target === _this._popup) {
          _this.close();
        }
      });
    }
  }]);
  return Popup;
}();

/***/ }),

/***/ "./src/scripts/PopupWithForm.js":
/*!**************************************!*\
  !*** ./src/scripts/PopupWithForm.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupWithForm: () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/Popup.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);
  var _super = _createSuper(PopupWithForm);
  function PopupWithForm(popupSelector, submitCallback) {
    var _this;
    _classCallCheck(this, PopupWithForm);
    _this = _super.call(this, popupSelector);
    _this._submitCallback = submitCallback;
    _this._formElement = _this._popup.querySelector(".popup__content");
    _this._submitButton = _this._formElement.querySelector(".popup__submit-button");
    return _this;
  }
  _createClass(PopupWithForm, [{
    key: "_getInputValues",
    value: function _getInputValues() {
      var inputList = this._formElement.querySelectorAll(".popup__input");
      var inputValues = {};
      inputList.forEach(function (input) {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;
      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);
      this._formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = _this2._getInputValues();
        _this2._submitCallback(formData);
      });
    }
  }, {
    key: "close",
    value: function close() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);
      this._formElement.reset();
    }
  }]);
  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/scripts/Section.js":
/*!********************************!*\
  !*** ./src/scripts/Section.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Section: () => (/* binding */ Section)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var items = _ref.items,
      renderer = _ref.renderer;
    _classCallCheck(this, Section);
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  _createClass(Section, [{
    key: "renderItems",
    value: function renderItems() {
      var _this = this;
      this._items.forEach(function (item) {
        _this._renderer(item);
      });
    }
  }, {
    key: "addItem",
    value: function addItem(element) {
      this._container.prepend(element);
    }
  }]);
  return Section;
}();


/***/ }),

/***/ "./src/scripts/UserInfo.js":
/*!*********************************!*\
  !*** ./src/scripts/UserInfo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserInfo: () => (/* binding */ UserInfo)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UserInfo = /*#__PURE__*/function () {
  function UserInfo(_ref) {
    var nameSelector = _ref.nameSelector,
      infoSelector = _ref.infoSelector;
    _classCallCheck(this, UserInfo);
    this.nameElement = document.querySelector(nameSelector);
    this.infoElement = document.querySelector(infoSelector);
  }
  _createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      return {
        name: this.nameElement.textContent,
        info: this.infoElement.textContent
      };
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(_ref2) {
      var name = _ref2.name,
        info = _ref2.info;
      this.nameElement.textContent = name;
      this.infoElement.textContent = info;
    }
  }]);
  return UserInfo;
}();

// Пример использования класса UserInfo:

/***/ }),

/***/ "./src/scripts/initialCards.js":
/*!*************************************!*\
  !*** ./src/scripts/initialCards.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialCards: () => (/* binding */ initialCards)
/* harmony export */ });
var initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card.js */ "./src/scripts/Card.js");
/* harmony import */ var _FormValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormValidator.js */ "./src/scripts/FormValidator.js");
/* harmony import */ var _initialCards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initialCards.js */ "./src/scripts/initialCards.js");
/* harmony import */ var _Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Section.js */ "./src/scripts/Section.js");
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/Popup.js");
/* harmony import */ var _UserInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserInfo.js */ "./src/scripts/UserInfo.js");
/* harmony import */ var _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PopupWithForm.js */ "./src/scripts/PopupWithForm.js");
/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/index.css */ "./src/pages/index.css");








var buttonEditProfile = document.querySelector(".profile__edit");
var profileName = document.querySelector(".profile__name");
var discription = document.querySelector(".profile__description");
var buttonAddProfile = document.querySelector(".profile__add");

// Далее идут переменные относящиеся к .popup
var editPopup = new _Popup_js__WEBPACK_IMPORTED_MODULE_4__.Popup('.popup_type_show-edit');
editPopup.setEventListeners();
var buttonClosePopupProfile = document.querySelector(".popup__close_type_edit");
var nameImput = document.querySelector(".popup__input_add_firstname");
var dicsImput = document.querySelector(".popup__input_add_disc");
var editPopupForm = document.querySelector(".popup__content_type_edit");
var editProfilePopup = new _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithForm('.popup_type_show-edit', function (formData) {
  // Здесь можно обработать данные формы для редактирования профиля
  // formData содержит данные полей формы
  var name = formData.name;
  var description = formData.description;

  // Обновляем информацию о пользователе на странице
  userInfo.setUserInfo({
    name: name,
    info: description
  });
  // Закрываем попап после успешного сохранения данных
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();
var addCardPopup = new _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithForm('.popup_type_show-image', function (formData) {
  // Здесь можно обработать данные формы для добавления карточки
  // formData содержит данные полей формы
  var name = formData.name;
  var link = formData.link;

  // Создаем новую карточку и добавляем её на страницу
  var cardElement = createCard(name, link);
  cardsSection.addItem(cardElement);
});
addCardPopup.setEventListeners();

// Далее идут переменные относящиеся к .popup_type_show-image/добавление карточек
var popupImg = new _Popup_js__WEBPACK_IMPORTED_MODULE_4__.Popup('.popup_type_show-image');
popupImg.setEventListeners();
var popupImgButtonClose = document.querySelector(".popup__close_type_img");
var popupImgForm = document.querySelector(".popup__content_type_img");
var viewPopup = new _Popup_js__WEBPACK_IMPORTED_MODULE_4__.Popup('.popup_type_show-view');
viewPopup.setEventListeners();
var viewPopupButtonClose = document.querySelector(".popup__close_type_view");
buttonEditProfile.addEventListener('click', function () {
  editPopup.open();
});
buttonAddProfile.addEventListener('click', function () {
  popupImg.open();
});
popupImgButtonClose.addEventListener('click', function () {
  popupImg.close();
});
buttonClosePopupProfile.addEventListener('click', function () {
  editPopup.close();
});
viewPopupButtonClose.addEventListener('click', function () {
  viewPopup.close();
});
var userInfo = new _UserInfo_js__WEBPACK_IMPORTED_MODULE_5__.UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description"
});
var handleCardClick = function handleCardClick(name, link) {
  viewPopup.open(link, name);
};
var createCard = function createCard(name, link) {
  var placeData = {
    name: name,
    link: link
  };

  // Создаем экземпляр класса Card и передаем handleCardClick
  var card = new _Card_js__WEBPACK_IMPORTED_MODULE_0__.Card(placeData, "#cards-template", handleCardClick);
  var cardElement = card._createCard();
  return cardElement;
};

// Создаем экземпляр класса Section для добавления новых карточек
var cardsSection = new _Section_js__WEBPACK_IMPORTED_MODULE_3__.Section({
  items: [],
  // Передаем пустой массив, так как начальные карточки уже отрисованы
  renderer: function renderer(cardData) {
    // Функция-рендерер для создания DOM-элементов
    var cardElement = createCard(cardData.name, cardData.link);
    cardsSection.addItem(cardElement);
  }
}, '.places__container');

// Создаем экземпляр класса Section для отрисовки начальных карточек
var initialCardsSection = new _Section_js__WEBPACK_IMPORTED_MODULE_3__.Section({
  items: _initialCards_js__WEBPACK_IMPORTED_MODULE_2__.initialCards,
  // Массив данных для отрисовки
  renderer: function renderer(cardData) {
    // Функция-рендерер для создания DOM-элементов
    var cardElement = createCard(cardData.name, cardData.link);
    initialCardsSection.addItem(cardElement);
  }
}, '.places__container');

// Вызываем метод renderItems для отрисовки начальных карточек
initialCardsSection.renderItems();
popupImgForm.addEventListener("submit", function (event) {
  event.preventDefault();
  popupImgForm.reset();
  popupImg.close();
});
document.addEventListener('DOMContentLoaded', function () {
  var profileEditingFormValidation = new _FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error-message'
  }, editPopupForm); // Передаем элемент формы вторым параметром

  profileEditingFormValidation.enableValidation();
});
document.addEventListener('DOMContentLoaded', function () {
  var formForEddingCardValidation = new _FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error-message'
  }, popupImgForm); // Передаем элемент формы вторым параметром

  // Ниже описан функционал редактирования профиля 
  buttonEditProfile.addEventListener("click", function () {
    formForEddingCardValidation.resetError();
    editPopup.open();
    nameImput.value = profileName.textContent;
    dicsImput.value = discription.textContent;
  });

  // Ниже описан функционал добавления карточек
  buttonAddProfile.addEventListener("click", function () {
    formForEddingCardValidation.resetError();
    popupImg.open();
    popupImgForm.reset();
  });
  popupImgButtonClose.addEventListener("click", function () {
    popupImg.close();
    popupImgForm.reset();
  });
  formForEddingCardValidation.enableValidation();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map