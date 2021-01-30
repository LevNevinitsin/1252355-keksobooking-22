/* Округление до целого сначала сделал через Math.round(), но потом вычитал,
что это даст неравномерное распределение, и итоге сделал через Math.floor()
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const getRandomInteger = (minValue, maxValue) => {
  minValue = Math.ceil(minValue);
  maxValue = Math.floor(maxValue);
  const isRangeCorrect = minValue <= maxValue && minValue >= 0 && maxValue >= 0;

  return (isRangeCorrect) ? Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue : null;
}

getRandomInteger(1, 3);

/* Здесь приведение числа к нужному количеству знаков после запятой сначала
хотел сделать через toFixed(), но распределение получается слишком неравномерным,
поэтому переписал на "ручной" вариант. Но оно адекватно работает только для
шестнадцати знаков после запятой (вроде бы для координат должно хватить), поэтому
в конце все равно добавил toFixed(), чтобы формально число знаков соответствовало
тому, что введено в значении параметра */

const getRandomBrokenNumber = (minValue, maxValue, decimalPlaces) => {
  const isRangeCorrect = minValue <= maxValue && minValue >= 0 && maxValue >= 0;

  /* Выделил в отдельную фунцию, чтобы проводить нужные операции, только если
  диапазон прошел проверку на корректность */
  const getNumber = () => {
    const divider = 10 ** decimalPlaces;
    const maxInclusionFix = 1 / 10 ** decimalPlaces;

    /* Чтобы рандомайзер работал по верхнему краю диапазона включительно, добавляем
    сверху число в зависимости от необходимого количества знаков после запятой */
    const numberForRandom = maxValue - minValue + maxInclusionFix;

    // рандомизируем и добавляем минимальное значение - получается "необработанный" результат
    const rawNumber = Math.random() * numberForRandom + minValue;

    // приводим к нужному количеству знаков после запятой
    const multipliedNumber = rawNumber * divider;
    const roundedNumber = Math.floor(multipliedNumber);
    return (roundedNumber / divider).toFixed(decimalPlaces);
  }

  return (isRangeCorrect) ? getNumber() : null;
}

getRandomBrokenNumber(0.5, 0.9, 67);
