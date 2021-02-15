import { getRandomInteger, getRandomFloatNumber, getRandomArrayElement, getRandomArray } from './util.js';
import {
  ADS_COUNT,
  LOCATION_MIN_LATITUDE,
  LOCATION_MAX_LATITUDE,
  LOCATION_MIN_LONGITUDE,
  LOCATION_MAX_LONGITUDE,
  MAX_RENT_PRICE,
  MAX_ROOMS,
  MAX_GUESTS,
  apartmentsMap,
  CHECKIN_CHECKOUT_TIMES,
  POSSIBLE_FEATURES,
  PHOTO_URLS,
  MAX_AVATARS_NUMBER,
  DESCRIPTION_COMPONENTS
} from './data.js';

const createAuthor = () => {
  return {
    avatar: `img/avatars/user0${getRandomInteger(1, MAX_AVATARS_NUMBER)}.png`,
  }
}

const createDescription = () => {
  let description = '';
  DESCRIPTION_COMPONENTS.forEach((descriptionComponent) => {
    if (Math.random() > 0.5) {
      description = description + descriptionComponent + '. ';
    }
  })
  return description.trim();
}

const apartmentTypes = Object.keys(apartmentsMap)

const createOffer = ([latitude, longitude]) => {
  return {
    get title() {
      return `${this.price} р./сутки, ${this.rooms}-комн., ${this.guests}-местн.`
    },
    address: `${latitude}, ${longitude}`,
    price: getRandomInteger(1, MAX_RENT_PRICE),
    type: getRandomArrayElement(apartmentTypes),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
    features: getRandomArray(POSSIBLE_FEATURES),
    description: createDescription(),
    photos: getRandomArray(PHOTO_URLS),
  }
}

const createLocation = ([latitude, longitude]) => {
  return {
    x: latitude,
    y: longitude,
  }
}

const createLocationCoordinates = () => {
  return [
    getRandomFloatNumber(LOCATION_MIN_LATITUDE, LOCATION_MAX_LATITUDE, 5),
    getRandomFloatNumber(LOCATION_MIN_LONGITUDE, LOCATION_MAX_LONGITUDE, 5),
  ]
}

const createAd = () => {
  const locationCoordinates = createLocationCoordinates();
  return {
    author: createAuthor(),
    offer: createOffer(locationCoordinates),
    location: createLocation(locationCoordinates),
  }
}

const createAds = () => new Array (ADS_COUNT).fill(null).map(() => createAd());

export { createAds };
