import { form, resetButton, guestsNumber, disableForm, enableForm, setAddress, confirmValidation } from './form.js';
import { requestError, postingSuccess, postingError, showPopup  } from './popup.js'
import { MAX_ADS_COUNT, filter, disableFilter, enableFilter, onFilterChange } from './filter.js';
import { CENTER_LAT, CENTER_LNG, ZOOM, map, mainMarker, createMarkers, reCreateMarkers } from './map.js';
import { getData, sendData } from './server.js';
import { removeRedBorder } from './util.js';

const CENTER_COORDINATES = [CENTER_LAT, CENTER_LNG];

disableForm();
disableFilter();

let ads = [];
let slicedAds = [];

map
  .on('load', () => {
    enableForm();
    setAddress(CENTER_COORDINATES);
    getData(
      (adsFromServer) => {
        ads = adsFromServer;
        slicedAds = ads.slice(0, MAX_ADS_COUNT)
        createMarkers(slicedAds);
        enableFilter();
      },
      () => {
        showPopup(requestError);
      },
    );
  })
  .setView(
    {
      lat: CENTER_LAT,
      lng: CENTER_LNG,
    },
    ZOOM,
  );

filter.addEventListener('change', () => {
  onFilterChange(ads);
});

const setDefaults = () => {
  form.reset();
  filter.reset();
  reCreateMarkers(slicedAds);
  mainMarker.setLatLng(CENTER_COORDINATES);
  setAddress(CENTER_COORDINATES);
  confirmValidation(guestsNumber);
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
  );
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaults();
});
