const getRandomInteger = (minValue, maxValue) => {
  minValue = Math.ceil(minValue);
  maxValue = Math.floor(maxValue);
  const isRangeCorrect = minValue <= maxValue && minValue >= 0 && maxValue >= 0;

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
  } else {
    return null
  }
}

const getRandomArrayElement = (array) => array[getRandomInteger(0, (array.length - 1))];

export { getRandomInteger, getRandomFloatNumber, getRandomArrayElement };
