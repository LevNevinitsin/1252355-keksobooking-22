import { getWordForm } from './util.js';

const apartmentsMap = {
  'flat': {
    ruLabel: 'Квартира',
    price: 1000,
  },
  'bungalow': {
    ruLabel: 'Бунгало',
    price: 0,
  },
  'house': {
    ruLabel: 'Дом',
    price: 5000,
  },
  'palace': {
    ruLabel: 'Дворец',
    price: 10000,
  },
};

const generateFeaturesList = (features) => {
  const featuresFragment = document.createDocumentFragment();

  features.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    const newFeatureModificator = `popup__feature--${feature}`;
    newFeature.classList.add(newFeatureModificator);
    newFeature.textContent = feature;
    featuresFragment.appendChild(newFeature);
  })

  return featuresFragment;
}

const generatePhotosList = (photos, popupPhoto) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = popupPhoto.cloneNode(true);
    newPhoto.src = photoSrc;
    photosFragment.appendChild(newPhoto);
  })

  return photosFragment;
}

const createCapacityContent = ([roomsNumber, guestsNumber]) => {
  const roomsWordForm = getWordForm(roomsNumber, ['комната', 'комнаты', 'комнат']);
  const guestsNumberForm = getWordForm(guestsNumber, ['го', 'х', 'ти', 'ми', 'ка', 'та']);
  const guestsWordForm = getWordForm(guestsNumber, ['гостя', 'гостей', 'гостей']);
  return `${roomsNumber} ${roomsWordForm} для ${guestsNumber}-${guestsNumberForm} ${guestsWordForm}`;
}

const fillOrRemove = (isDataEnough, element, content, cb, cbParameters) => {
  if (isDataEnough) {
    if (cb) { content = cb(cbParameters); }
    element.textContent = content;
  } else {
    element.remove();
  }
}

const adTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const generateAdMarkup = (ad) => {
  const {
    author: {avatar},
    offer: {
      title,
      address,
      price,
      type,
      rooms: roomsNumber,
      guests: guestsNumber,
      checkin: checkinTime,
      checkout: checkoutTime,
      features,
      description,
      photos,
    },
  } = ad;
  const newAd = adTemplate.cloneNode(true);
  newAd.querySelector('.popup__title').textContent = title;
  newAd.querySelector('.popup__text--address').textContent = address;

  const popupPrice = newAd.querySelector('.popup__text--price')
  const rate = ' <span>₽/ночь</span>';
  popupPrice.textContent = `${price}`;
  popupPrice.insertAdjacentHTML('beforeend', rate);

  const popupType = newAd.querySelector('.popup__type');
  fillOrRemove(type, popupType, apartmentsMap[type].ruLabel);

  const popupTextCapacity = newAd.querySelector('.popup__text--capacity');
  let isDataEnough = Boolean(roomsNumber) && Boolean(guestsNumber);
  fillOrRemove(isDataEnough, popupTextCapacity, '', createCapacityContent, [roomsNumber, guestsNumber]);

  const popupTextTime = newAd.querySelector('.popup__text--time');
  const timeContent = `Заезд после ${checkinTime}, выезд до ${checkoutTime}`;
  isDataEnough = Boolean(checkinTime) && Boolean(checkoutTime);
  fillOrRemove(isDataEnough, popupTextTime, timeContent);

  const popupFeaturesList = newAd.querySelector('.popup__features');
  if (features.length) {
    popupFeaturesList.innerHTML = '';
    popupFeaturesList.appendChild(generateFeaturesList(features));
  } else {
    popupFeaturesList.remove();
  }

  const popupDescription = newAd.querySelector('.popup__description');
  fillOrRemove(description, popupDescription, description)

  const popupPhotosList = newAd.querySelector('.popup__photos');
  if (photos.length) {
    const popupPhoto = popupPhotosList.querySelector('.popup__photo');
    popupPhotosList.innerHTML = '';
    popupPhotosList.appendChild(generatePhotosList(photos, popupPhoto));
  } else {
    popupPhotosList.remove();
  }

  const popupAvatar = newAd.querySelector('.popup__avatar');
  if (avatar) {
    popupAvatar.src = avatar;
  } else {
    popupAvatar.remove();
  }

  return newAd;
}

export { apartmentsMap, generateAdMarkup }
