import { getRandomInteger, getRandomFloatNumber, getRandomArrayElement } from './util.js';

const SIMILAR_RENT_ADS_COUNT = 10;
const LOCATION_MIN_LATITUDE = 35.65;
const LOCATION_MAX_LATITUDE = 35.7;
const LOCATION_MIN_LONGITUDE = 139.7;
const LOCATION_MAX_LONGITUDE = 139.8;
const MAX_RENT_PRICE = 1000000;
const MAX_ROOMS = 20;
const MAX_GUESTS = 40;
const APARTMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKIN_CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const POSSIBLE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]
const PHOTO_URLS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]
const MAX_PHOTOS_NUMBER = 20;
const DESCRIPTION_COMPONENTS = [
  'Срочно',
  'Очень чистое жильё',
  'Пешая доступность от метро',
  'Развитая инфраструктура: магазины, поликлиники, школа, детский сад',
  'Тихие соседи',
  'Спокойный район',
  'Отличный вид на город',
  'Возможен торг',
]
const AVATAR_URL_PARTS = [
  'img/avatars/user0',
  '.png',
]

const createAuthor = () => {
  return {
    avatar: AVATAR_URL_PARTS[0] + getRandomInteger(1, 8).toString() + AVATAR_URL_PARTS[1],
  }
}

const createFeatures = () => {
  const features = [];
  POSSIBLE_FEATURES.forEach((possibleFeature) => {
    if (getRandomInteger(0, 1) === 1) {
      features.push(possibleFeature);
    }
  })
  return features;
}

const createDescription = () => {
  let description = '';
  DESCRIPTION_COMPONENTS.forEach((descriptionComponent) => {
    if (getRandomInteger(0, 1) === 1) {
      description = description + descriptionComponent + '. ';
    }
  })
  return description.trim();
}

const createPhotos = () => {
  const photosNumber = getRandomInteger(1, MAX_PHOTOS_NUMBER);
  const photos = [];
  for (let i = 0; i <= photosNumber; i++) {
    photos.push(getRandomArrayElement(PHOTO_URLS));
  }
  return photos;
}

const createOffer = ([latitude, longitude]) => {
  return {
    get title() {
      return this.price + ' р./сутки, ' + this.rooms + '-комн., ' + this.guests + '-местн.'
    },
    address: latitude.toString() + ', ' + longitude.toString(),
    price: getRandomInteger(1, MAX_RENT_PRICE),
    type: getRandomArrayElement(APARTMENT_TYPES),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
    features: createFeatures(),
    description: createDescription(),
    photos: createPhotos(),
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

const createRentAd = () => {
  const locationCoordinates = createLocationCoordinates();
  return {
    author: createAuthor(),
    offer: createOffer(locationCoordinates),
    location: createLocation(locationCoordinates),
  }
}

const createSimilarRentAds = () => new Array (SIMILAR_RENT_ADS_COUNT).fill(null).map(() => createRentAd());

export { createSimilarRentAds };
