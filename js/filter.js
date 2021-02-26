/* global ads:readonly */
import { reCreateMarkers } from './map.js';
import { disableElements, enableElements } from './util.js';

const MAX_ADS_COUNT = 10;

const DEFAULT_SELECT_VALUE = 'any';
const priceFilter = {
  'middle': (value) => (value >= 10000 && value < 50000),
  'low': (value) => value < 10000,
  'high': (value) => value >= 50000,
  [DEFAULT_SELECT_VALUE]: () => true,
};
const filter = document.querySelector('.map__filters');
const selectFilters = filter.querySelectorAll('select');
const filterElements = filter.querySelectorAll('select, fieldset');

const disableFilter = () => {
  filter.classList.add('.map__filters--disabled');
  disableElements(filterElements);
}

const enableFilter = () => {
  filter.classList.remove('.map__filters--disabled');
  enableElements(filterElements);
}

const isSelectMatched = (select, selectType, offer) => {
  const value = select.value;
  const adValue = offer[selectType];
  return selectType === 'price' ? priceFilter[value](adValue) : value === DEFAULT_SELECT_VALUE ? true : value === adValue.toString();
}

const isFeaturesMatched = (selectedFeatures, adFeatures) => {
  return selectedFeatures.every((selectedFeature) => {
    return adFeatures.includes(selectedFeature);
  })
}

const isAdMatched = (offer) => {
  const isSelectsMatched = Array.from(selectFilters).every((select) => {
    const selectType = select.name.split('-')[1];
    return isSelectMatched(select, selectType, offer);
  })

  const selectedFeatures = Array.from(filter.querySelectorAll('input:checked')).map((input) => input.id.split('-')[1]);
  return isSelectsMatched && isFeaturesMatched(selectedFeatures, offer.features);
}

const filterAds = (ads) => {
  const filteredAds = [];
  let ad;
  for (let i = 0; i < ads.length; i++) {
    ad = ads[i];
    if (isAdMatched(ad.offer)) { filteredAds.push(ad) }
    if (filteredAds.length === MAX_ADS_COUNT) {return filteredAds}
  }
  return filteredAds;
}

const filterMarkers = (ads) => {
  const filteredAds = filterAds(ads);
  reCreateMarkers(filteredAds);
}

const onFilterChange = (ads) => filterMarkers(ads);

filter.addEventListener('change', () => {
  onFilterChange(ads);
});

export { MAX_ADS_COUNT, filter, disableFilter, enableFilter, filterMarkers, onFilterChange };
