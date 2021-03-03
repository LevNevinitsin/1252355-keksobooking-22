import {
  form,
  avatar,
  avatarPreview,
  price,
  photo,
  defaultAvatar,
  resetButton,
  guestsNumber,
  disableForm,
  enableForm,
  setPriceAttributes,
  setAddress,
  confirmValidation,
  confirmAndPreview,
  resetPhoto
} from './form.js';
import { requestError, postingSuccess, postingError, showPopup } from './popup.js';
import { MAX_ADS_COUNT, filter, disableFilter, enableFilter, setFilterListener } from './filter.js';
import { CENTER_LAT, CENTER_LNG, ZOOM, map, mainMarker, createMarkers, reCreateMarkers } from './map.js';
import { getData, sendData } from './server.js';
import { removeRedBorder } from './util.js';

const SERVER_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_POST = 'https://22.javascript.pages.academy/keksobooking';
const CENTER_COORDINATES = [CENTER_LAT, CENTER_LNG];

disableForm();
disableFilter();

let slicedAds = [];

map
  .on('load', () => {
    enableForm();
    setAddress(CENTER_COORDINATES);
    getData((ads) => {
      setFilterListener(ads);
      slicedAds = ads.slice(0, MAX_ADS_COUNT)
      createMarkers(slicedAds);
      enableFilter();
    },
    () => {
      showPopup(requestError);
    },
    SERVER_GET,
    );
  })
  .setView(
    {
      lat: CENTER_LAT,
      lng: CENTER_LNG,
    },
    ZOOM,
  );

const setDefaults = () => {
  form.reset();
  filter.reset();
  reCreateMarkers(slicedAds);
  map.setView(
    {
      lat: CENTER_LAT,
      lng: CENTER_LNG,
    },
    ZOOM,
  )
  mainMarker.setLatLng(CENTER_COORDINATES);
  setAddress(CENTER_COORDINATES);
  price.setCustomValidity('');
  setPriceAttributes();
  confirmValidation(guestsNumber);
  confirmAndPreview(avatar, undefined, avatarPreview, defaultAvatar);
  resetPhoto(photo);
  Array.from(form.elements).forEach((element) => {
    removeRedBorder(element);
  });
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showPopup(postingSuccess);
      setDefaults();
    },
    () => {
      showPopup(postingError);
    },
    new FormData(evt.target),
    SERVER_POST,
  );
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults();
});
