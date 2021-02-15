const ADS_COUNT = 10;
const LOCATION_MIN_LATITUDE = 35.65;
const LOCATION_MAX_LATITUDE = 35.7;
const LOCATION_MIN_LONGITUDE = 139.7;
const LOCATION_MAX_LONGITUDE = 139.8;
const MAX_RENT_PRICE = 1000000;
const MAX_ROOMS = 20;
const MAX_GUESTS = 40;
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
}
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
const MAX_AVATARS_NUMBER = 8;
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

export {
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
};
