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

const editButton = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name")
const discription = document.querySelector(".profile__description")
const addButton = document.querySelector(".profile__add");

//далее идут переменные относящиеся к .popup
const editPopup = document.querySelector(".popup");
const editButtonClose = editPopup.querySelector(".popup-edit__close");
const nameImput = editPopup.querySelector(".popup__input_add_firstname");
const dicsImput = editPopup.querySelector(".popup__input_add_disc");
const editPopupForm = editPopup.querySelector(".popup-edit__content")

//далее идут переменные относящиеся к .popup_type_show-image/добавление карточек
const popupImg = document.querySelector(".popup_type_show-image");
const popupImgButtonClose = document.querySelector(".popup-img__close");
const popupImgForm = document.querySelector(".popup-img__content-img");

//далее идут переменные относящиеся к .popup-view/просмотр изображений
const viewPopup = document.querySelector(".popup_type_show-view")
const viewPopupButtonClose = document.querySelector(".popup-view__close")

//эта переиспользуемая функция закрывает попапы
const closePopup = (editPopup) => {
  editPopup.classList.remove("popup_opened");
}

//эта переиспользуемая функция открывает попапы
const openPopup = (editPopup) => {
  editPopup.classList.add("popup_opened");
}

//ниже описан функционал редактирования профиля 
editButton.addEventListener("click", () => {
  openPopup(editPopup);
  nameImput.value = profileName.textContent;
  dicsImput.value = discription.textContent;
});

editButtonClose.addEventListener("click", () => {
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

  const srcViewPopup = document.querySelector(".popup-view__image")
  const popupViewDescription = document.querySelector(".popup-view__description")

  cardTitle.textContent = cardData.name
  cardImage.src = cardData.link
  cardImage.textContent = cardData.link

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
addButton.addEventListener("click", () => {
  openPopup(popupImg);
});

popupImgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});

const handleEditCardSubmit = (event) => {
  event.preventDefault()
  const placeImput = popupImgForm.querySelector(".popup-img__input_add_place")
  const srcImput = popupImgForm.querySelector(".popup-img__input_add_src")
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
