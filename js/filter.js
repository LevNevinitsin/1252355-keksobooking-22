import { ads, createMarkers, removeMarkers } from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const selectFilters = mapFiltersForm.querySelectorAll('select');

const isSelectMatched = (selectNumber, adValue) => {
  if (selectFilters[selectNumber].value === 'any') { return true }
  else if (selectFilters[selectNumber].value === adValue) { return true }
  return false;
}

const isPriceMatched = (selectNumber, adValue) => {
  switch (selectFilters[selectNumber].value) {
    case 'middle':
      if (adValue >= 10000 & adValue < 50000) { return true }
      return false;
    case 'low':
      if (adValue < 10000) { return true }
      return false;
    case 'high':
      if (adValue >= 50000) { return true }
      return false;
    case 'any':
      return true;
  }
}

const featuresFilters = mapFiltersForm.querySelectorAll('input');

const getDemandedFeatures = () => {
  const demandedFeatures = []

  featuresFilters.forEach((featuresFilter) => {
    if (featuresFilter.checked === true) {
      demandedFeatures.push(featuresFilter.id.slice(7));
    }
  })

  return demandedFeatures;
}

const isFeaturesMatched = (demandedFeatures, adFeatures) => {
  const result = demandedFeatures.every((demandedFeature) => {
    return adFeatures.includes(demandedFeature)
  })
  return result;
}

const isAdMatched = (ad) => {
  const {
    offer: {
      price,
      type,
      rooms: roomsNumber,
      guests: guestsNumber,
      features,
    },
  } = ad;

  return isSelectMatched(0, type) &&
    isPriceMatched(1, price) &&
    isSelectMatched(2, roomsNumber.toString()) &&
    isSelectMatched(3, guestsNumber.toString()) &&
    isFeaturesMatched(getDemandedFeatures(), features);
}

const filter = (ads) => {
  const filteredAds = [];
  ads.forEach((ad) => {
    if (isAdMatched(ad)) { filteredAds.push(ad) }
  })
  return filteredAds;
}

const isAnySelect = (selectFilters) => {
  for (let selectFilter of selectFilters) {
    if (selectFilter.value !== 'any') {
      return false;
    }
  }
  return true;
}

const isAnyFeatures = (featuresFilters) => {
  for (let featuresFilter of featuresFilters) {
    if (featuresFilter.checked !== false) {
      return false;
    }
  }
  return true;
}

const isNoFilter = () => {
  if (isAnySelect(selectFilters) && isAnyFeatures(featuresFilters)) { return true }
  return false;
}

const reCreateMarkers = (ads) => {
  removeMarkers();
  createMarkers(ads);
}

const onFilterChange = (evt) => {
  if (evt.target.nodeName === 'SELECT' || evt.target.nodeName === 'INPUT') {
    if (isNoFilter()) {
      reCreateMarkers(ads);
    } else {
      reCreateMarkers(filter(ads));
    }
  }
}

mapFiltersForm.addEventListener('change', (evt) => {
  onFilterChange(evt);
})
