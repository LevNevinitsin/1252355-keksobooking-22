import { apartmentsMap } from './data.js';
import { getWordForm } from './util.js';

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

const generateAd = (ad) => {
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
  newAd.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;

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
  if (features.length > 0) {
    popupFeaturesList.innerHTML = '';
    popupFeaturesList.appendChild(generateFeaturesList(features));
  } else {
    popupFeaturesList.remove();
  }

  const popupDescription = newAd.querySelector('.popup__description');
  fillOrRemove(description, popupDescription, description)

  const popupPhotosList = newAd.querySelector('.popup__photos');
  if (photos.length > 0) {
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

const adsFragment = document.createDocumentFragment();

const mapCanvas = document.querySelector('.map__canvas');

const generateAdsMarkup = (ads) => {
  ads.forEach((ad) => {
    const newAd = generateAd(ad);
    adsFragment.appendChild(newAd);
  })
  mapCanvas.appendChild(adsFragment);
}

export { generateAdsMarkup }
