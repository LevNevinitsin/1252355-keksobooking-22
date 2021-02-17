const adForm = document.querySelector('.ad-form');
adForm.classList.add('.ad-form--disabled');

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  })
}

const adFieldsets = adForm.querySelectorAll('fieldset');
disableElements(adFieldsets);

const mapFiltersForm = document.querySelector('.map__filters');
mapFiltersForm.classList.add('.map__filters--disabled');
const filterElements = mapFiltersForm.querySelectorAll('select, fieldset');

disableElements(filterElements);

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  })
}

const activatePage = () => {
  adForm.classList.remove('.ad-form--disabled');
  mapFiltersForm.classList.remove('.map__filters--disabled');
  enableElements(adFieldsets);
  enableElements(filterElements);
}

export { activatePage }
