const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonEditProfile = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name")
const discription = document.querySelector(".profile__description")
const buttonAddProfile = document.querySelector(".profile__add");

//далее идут переменные относящиеся к .popup
const editPopup = document.querySelector(".popup_type_show-edit");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close_type_edit");
const nameImput = editPopup.querySelector(".popup__input_add_firstname");
const dicsImput = editPopup.querySelector(".popup__input_add_disc");
const editPopupForm = editPopup.querySelector(".popup__content_type_edit")

//далее идут переменные относящиеся к .popup_type_show-image/добавление карточек
const popupImg = document.querySelector(".popup_type_show-image");
const popupImgButtonClose = document.querySelector(".popup__close_type_img");
const popupImgForm = document.querySelector(".popup__content_type_img");

//далее идут переменные относящиеся к .popup-view/просмотр изображений
const viewPopup = document.querySelector(".popup_type_show-view")
const viewPopupButtonClose = document.querySelector(".popup__close_type_view")

//эта переиспользуемая функция закрывает попапы
const closePopup = (editPopup) => {
  editPopup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleCloseByEsc)
}

//эта переиспользуемая функция открывает попапы
const openPopup = (editPopup) => {
  editPopup.classList.add("popup_opened");
  document.addEventListener('keydown', handleCloseByEsc)
  submitButtonDisable(submitButtonSelector)
}

//ниже описан функционал редактирования профиля 
buttonEditProfile.addEventListener("click", () => {
  openPopup(editPopup);
  nameImput.value = profileName.textContent;
  dicsImput.value = discription.textContent;
});

buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(editPopup);
});

editPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameImput.value;
  profileName.textContent = name;
  const disc = dicsImput.value;
  discription.textContent = disc;
  closePopup(editPopup);

});

//ниже описан рендеринг шаблона
const cardsTemplate = document.getElementById("cards-template")
const placesContainer = document.querySelector(".places__container")

const createCardElement = (cardData) => {
  const cardElement = cardsTemplate.content.querySelector(".place").cloneNode(true)
  const cardTitle = cardElement.querySelector(".place__title")
  const cardImage = cardElement.querySelector(".place__image")

  const srcViewPopup = document.querySelector(".popup__image")
  const popupViewDescription = document.querySelector(".popup__description")

  cardTitle.textContent = cardData.name
  cardImage.src = cardData.link
  cardImage.alt = cardData.name

  const deleteButton = cardElement.querySelector(".place__delete")
  const likeButton = cardElement.querySelector(".place__like")

  const handleDelete = () => {
    cardElement.remove()
  }

  const handleLike = () => {
    likeButton.classList.toggle('place__like-img_active')
  }

  deleteButton.addEventListener('click', handleDelete)

  likeButton.addEventListener('click', handleLike)

  cardImage.addEventListener('click', (event) => {
    event.preventDefault();
    openPopup(viewPopup);
    srcViewPopup.src = cardData.link
    srcViewPopup.alt = cardData.name
    popupViewDescription.textContent = cardData.name
  });

  return cardElement
}

viewPopupButtonClose.addEventListener("click", () => {
  closePopup(viewPopup);
});

const renderCardElement = (cardElement) => {
  placesContainer.append(cardElement)
}

const renderNewCardElement = (cardElement) => {
  placesContainer.prepend(cardElement)
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card))
})

//ниже описан функционал добавления карточек
buttonAddProfile.addEventListener("click", () => {
  openPopup(popupImg);
  placeImput.value = ""
  srcImput.value = ""
});

popupImgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});

const placeImput = popupImgForm.querySelector(".popup__input_add_place")
const srcImput = popupImgForm.querySelector(".popup__input_add_src")

const handleEditCardSubmit = (event) => {
  event.preventDefault()
  const name = placeImput.value
  const link = srcImput.value
  const placeData = {
    name,
    link,
  }
  renderNewCardElement(createCardElement(placeData))
  closePopup(popupImg);
}

popupImgForm.addEventListener("submit", handleEditCardSubmit)

// функционал закрытия на ESC

const handleCloseByEsc = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

const handleClosebyClickonOverlay = (event) => {
  const popups = document.querySelectorAll('.popup')
  const targetPopups = Array.from(popups)
  targetPopups.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        closePopup(popup)
      }
    })
  })
}
handleClosebyClickonOverlay()