import { apartmentsMap } from './data.js';
import { getWordForm, disableElements, enableElements, addRedBorder, removeRedBorder } from './util.js';

const ADDRESS_DIGITS_NUMBER = 5;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const SYMBOL_WORDS = [
  'символ',
  'символа',
  'символов',
];
const roomsGuestsMap = {
  '1': [2],
  '2': [1, 2],
  '3': [0, 1, 2],
  '100': [3],
}

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const avatar = form.querySelector('#avatar');
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const guestsOptions = guestsNumber.querySelectorAll('option');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const photo = form.querySelector('#images');
const button = form.querySelector('.ad-form__submit');

const disableForm = () => {
  form.classList.add('.ad-form--disabled');
  disableElements(fieldsets);
}

const enableForm = () => {
  form.classList.remove('.ad-form--disabled');
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
  const roomsValue = roomsNumber.value;
  const areGuestsSynced = roomsGuestsMap[roomsValue].includes(guestsNumber.selectedIndex)

  if (!areGuestsSynced) {
    const guestsString = roomsGuestsMap[roomsValue].map((optionIndex) => `"${guestsOptions[optionIndex].textContent}"`).join(', ')
    guestsNumber.setCustomValidity(`Для выбранного количества комнат доступны варианты: ${guestsString}.`)
  } else {
    confirmValidation(guestsNumber);
  }

  guestsNumber.reportValidity();
};

const onRoomsNumberChange = () => validateGuests();
const onGuestsNumberChange = () => validateGuests();

roomsNumber.addEventListener('change', onRoomsNumberChange);
guestsNumber.addEventListener('change', onGuestsNumberChange);

const validateFile = (input) => {
  const isImage = input.files[0].type.startsWith('image');

  if (!isImage) {
    input.setCustomValidity('Выберите файл-изображение.');
  } else {
    input.setCustomValidity('');
    removeRedBorder(input.nextElementSibling);
  }

  input.reportValidity();
}

const onAvatarChange = (evt) => validateFile(evt.target);
const onPhotoChange = (evt) => validateFile(evt.target);

avatar.addEventListener('change', onAvatarChange);
photo.addEventListener('change', onPhotoChange);

const highlightInvalidFields = () => {
  const invalidElements = form.querySelectorAll('input:invalid, select:invalid');
  invalidElements.forEach((element) => element.type === 'file' ? addRedBorder(element.nextElementSibling) : addRedBorder(element));
}

button.addEventListener('click', highlightInvalidFields);

export { disableForm, enableForm, setAddress };
