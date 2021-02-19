const getRandomInteger = (minValue, maxValue) => {
  minValue = Math.ceil(minValue);
  maxValue = Math.floor(maxValue);
  const isRangeCorrect = minValue >= 0 && maxValue >= minValue;

  return isRangeCorrect ? Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue : null;
}

const getRandomFloatNumber = (minValue, maxValue, decimalPlaces) => {
  const isRangeCorrect = minValue >= 0 && maxValue >= minValue;

  if (isRangeCorrect) {
    const divider = Math.pow(10, decimalPlaces);
    const maxInclusionFix = 1 / Math.pow(10, decimalPlaces);

    const numberForRandom = maxValue - minValue + maxInclusionFix;
    const rawNumber = Math.random() * numberForRandom + minValue;
    const multipliedNumber = rawNumber * divider;
    const roundedNumber = Math.floor(multipliedNumber);

    return parseFloat((roundedNumber / divider).toFixed(decimalPlaces));
  }

  return null
}

const getRandomArrayElement = (array) => array[getRandomInteger(0, (array.length - 1))];

const getRandomArray = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (Math.random() > 0.5) {
      newArray.push(element);
    }
  })
  return newArray;
}

const getWordForm = (number, wordForms) => {
  let lastTwoCharsNum = number % 100;
  let lastChar = lastTwoCharsNum % 10;

  if (lastTwoCharsNum > 10 && lastTwoCharsNum < 20) { return wordForms[2]; }
  if (lastChar === 1) { return wordForms[0]; }
  if (lastChar > 1 && lastChar < 5) { return wordForms[1]; }
  if (lastChar > 6 && lastChar < 9 && wordForms[3]) { return wordForms[3]; }
  if (lastTwoCharsNum === 40 && wordForms[4]) { return wordForms[4]; }
  if ((lastTwoCharsNum === 90 || lastTwoCharsNum === 0) && wordForms[5]) { return wordForms[5]; }
  return wordForms[2];
}

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  })
}

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  })
}

const addRedBorder = (element) => {
  element.classList.add('js-red-border');
  element.classList.add('js-animate-border');

  element.addEventListener('animationend', () => {
    element.classList.remove('js-animate-border');
  }, { once: true });
}

const removeRedBorder = (element) => {
  element.classList.remove('js-red-border');
}

export {
  getRandomInteger,
  getRandomFloatNumber,
  getRandomArrayElement,
  getRandomArray,
  getWordForm,
  disableElements,
  enableElements,
  addRedBorder,
  removeRedBorder
};
