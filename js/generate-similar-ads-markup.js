import { createSimilarRentAds } from './create-similar-rent-ads.js'

const FIRST_AD_NUMBER_TO_DRAW = 0;
const LAST_AD_NUMBER_TO_DRAW = 0;

const convertTypeToRu = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Квартира';
    case 'house':
      return 'Квартира';
    case 'palace':
      return 'Квартира';
  }
}

const generateFeaturesList = (features) => {
  const featuresFragment = document.createDocumentFragment();

  features.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    const newFeatureModificator = 'popup__feature--' + feature;
    newFeature.classList.add(newFeatureModificator);
    newFeature.textContent = feature;
    featuresFragment.appendChild(newFeature);
  })

  return featuresFragment;
}

const generatePhotos = (photos, photoTemplate) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photoSrc;
    photosFragment.appendChild(newPhoto);
  })

  return photosFragment;
}

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createRentAdElement = ({
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
}) => {
  const rentAdElement = similarAdTemplate.cloneNode(true);
  rentAdElement.querySelector('.popup__title').textContent = title;
  rentAdElement.querySelector('.popup__text--address').textContent = address;
  rentAdElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  rentAdElement.querySelector('.popup__type').textContent = convertTypeToRu(type);
  rentAdElement.querySelector('.popup__text--capacity').textContent = `${roomsNumber} комнаты для ${guestsNumber} гостей`;
  rentAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkinTime}, выезд до ${checkoutTime}`;

  rentAdElement.querySelector('.popup__features').innerHTML = '';
  rentAdElement.querySelector('.popup__features').appendChild(generateFeaturesList(features));

  rentAdElement.querySelector('.popup__description').textContent = description;

  const photoTemplate = rentAdElement.querySelector('.popup__photo');
  rentAdElement.querySelector('.popup__photos').innerHTML = '';
  rentAdElement.querySelector('.popup__photos').appendChild(generatePhotos(photos, photoTemplate));

  rentAdElement.querySelector('.popup__avatar').src = avatar;

  return rentAdElement;
}

const similarRentAds = createSimilarRentAds().slice(FIRST_AD_NUMBER_TO_DRAW, LAST_AD_NUMBER_TO_DRAW + 1);

const similarAdsListFragment = document.createDocumentFragment();

const mapCanvasElement = document.querySelector('.map__canvas');

const generateSimilarAdsMarkup = () => {
  similarRentAds.forEach((similarRentAd) => {
    const newRentAdElement = createRentAdElement(similarRentAd)
    similarAdsListFragment.appendChild(newRentAdElement);
  })
  mapCanvasElement.appendChild(similarAdsListFragment);
}

export { generateSimilarAdsMarkup }
