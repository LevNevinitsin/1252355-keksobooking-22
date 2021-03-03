import { apartmentsMap } from './generate-ad-markup.js';
import { getWordForm, disableElements, enableElements, addRedBorder, removeRedBorder } from './util.js';

const ADDRESS_DIGITS_NUMBER = 5;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const EXTRA_ROOMS_VALUE = 100;
const EXTRA_GUESTS_VALUE = 0;
const EXTRA_GUESTS_MESSAGE = 'Для выбранного количества комнат доступен только вариант "не для гостей".';
const GUESTS_MESSAGE = 'Количество гостей должно быть не меньше одного и не должно превышать выбранного количества комнат.';
const IMAGE_MESSAGE = 'Выберите файл-изображение.';
const SYMBOL_WORDS = [
  'символ',
  'символа',
  'символов',
];
const PREVIEW_SIZE = 70;
const PREVIEW_ALT = 'Превью фотографии жилья';

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const avatar = form.querySelector('#avatar');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const photo = form.querySelector('#images');
const photoBox = form.querySelector('.ad-form__photo');
let photoPreview;
const button = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  disableElements(fieldsets);
}

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  enableElements(fieldsets);
}

const setAddress = ([lat, lng]) => {
  address.value = `${lat.toFixed(ADDRESS_DIGITS_NUMBER)}, ${lng.toFixed(ADDRESS_DIGITS_NUMBER)}`;
}

const setPriceAttributes = () => {
  const apartmentPrice = apartmentsMap[type.value].price
  price.min = apartmentPrice;
  price.placeholder = apartmentPrice;
}

setPriceAttributes();

const onTypeChange = () => setPriceAttributes();
type.addEventListener('change', onTypeChange);

const syncTimeValues = (from, to) => {
  to.selectedIndex = from.selectedIndex;
}

const onTimeInChange = (evt) => syncTimeValues(evt.target, timeOut);
const onTimeOutChange = (evt) => syncTimeValues(evt.target, timeIn);

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

const confirmValidation = (element) => {
  element.setCustomValidity('');
  removeRedBorder(element);
}

const getTitleValidity = (symbolsDifference) => `${symbolsDifference} ${getWordForm(symbolsDifference, SYMBOL_WORDS)}`;

const onTitleInput = () => {
  const length = title.value.length;

  if (length < MIN_TITLE_LENGTH) {
    const symbolsDifference = MIN_TITLE_LENGTH - length;
    title.setCustomValidity(`Добавьте ещё ${getTitleValidity(symbolsDifference)}.`);
  } else if (length > MAX_TITLE_LENGTH) {
    const symbolsDifference = length - MAX_TITLE_LENGTH;
    title.setCustomValidity(`Уберите лишние ${getTitleValidity(symbolsDifference)}.`);
  } else {
    confirmValidation(title);
  }

  title.reportValidity();
}

title.addEventListener('input', onTitleInput);

const onPriceInput = () => {
  const value = price.value;

  if (value > MAX_PRICE) {
    price.setCustomValidity(`Цена должна быть меньше ${MAX_PRICE}.`);
  } else {
    confirmValidation(price);
  }

  price.reportValidity();
}

price.addEventListener('input', onPriceInput);

const validateGuests = () => {
  const roomsValue = parseInt(roomsNumber.value);
  const guestsValue = parseInt(guestsNumber.value);

  let areGuestsSynced;
  let validityMessage;

  if (roomsValue === EXTRA_ROOMS_VALUE) {
    areGuestsSynced = guestsValue === EXTRA_GUESTS_VALUE;
    validityMessage = EXTRA_GUESTS_MESSAGE;
  } else {
    areGuestsSynced = guestsValue <= roomsValue && guestsValue !== EXTRA_GUESTS_VALUE;
    validityMessage = GUESTS_MESSAGE;
  }

  !areGuestsSynced ? guestsNumber.setCustomValidity(validityMessage) : confirmValidation(guestsNumber);

  guestsNumber.reportValidity();
};

const onRoomsNumberChange = () => validateGuests();
const onGuestsNumberChange = () => validateGuests();

roomsNumber.addEventListener('change', onRoomsNumberChange);
guestsNumber.addEventListener('change', onGuestsNumberChange);

const isImage = (file) => file.type.startsWith('image');

const setPreviewSrc = (file, block, defaultSrc) => {
  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      block.src = reader.result;
    })

    reader.readAsDataURL(file);
  } else {
    block.src = defaultSrc;
  }
}

const confirmImageValidity = (input) => {
  input.setCustomValidity('');
  removeRedBorder(input.nextElementSibling);
}

const confirmAndPreview = (input, file, preview, defaultSrc) => {
  confirmImageValidity(input);
  setPreviewSrc(file, preview, defaultSrc);
}

const defaultAvatar = avatarPreview.src;

const onAvatarChange = () => {
  const file = avatar.files[0];

  if (!file || isImage(file)) {
    confirmAndPreview(avatar, file, avatarPreview, defaultAvatar);
  } else {
    avatar.setCustomValidity(IMAGE_MESSAGE);
    if (avatarPreview.src !== defaultAvatar) {
      avatarPreview.src = defaultAvatar;
    }
  }

  avatar.reportValidity();
}

const isPreviewAdded = () => photoBox.contains(photoPreview);

const removePreview = () => {
  if (isPreviewAdded()) {
    photoPreview.remove();
  }
}

const resetPhoto = (input) => {
  confirmImageValidity(input);
  removePreview();
}

const onPhotoChange = () => {
  const file = photo.files[0];

  if (!photoPreview) {
    photoPreview = document.createElement('img');
    photoPreview.width = PREVIEW_SIZE;
    photoPreview.height = PREVIEW_SIZE;
    photoPreview.alt = PREVIEW_ALT;
  }

  if (!file) {
    resetPhoto(photo);
  } else {
    if (!isImage(file)) {
      photo.setCustomValidity(IMAGE_MESSAGE);
      removePreview();
    } else {
      confirmAndPreview(photo, file, photoPreview);
      if (!isPreviewAdded()) {
        photoBox.appendChild(photoPreview);
      }
    }
  }

  photo.reportValidity();
}

avatar.addEventListener('change', onAvatarChange);
photo.addEventListener('change', onPhotoChange);

const highlightInvalidFields = () => {
  const invalidElements = form.querySelectorAll('input:invalid, select:invalid');
  invalidElements.forEach((element) => element.type === 'file' ? addRedBorder(element.nextElementSibling) : addRedBorder(element));
}

button.addEventListener('click', highlightInvalidFields);

export {
  form,
  avatar,
  avatarPreview,
  price,
  guestsNumber,
  photo,
  resetButton,
  disableForm,
  enableForm,
  setAddress,
  setPriceAttributes,
  defaultAvatar,
  confirmValidation,
  confirmAndPreview,
  resetPhoto
};
