const BORDER_CLASS = 'js-red-border';
const BORDER_ANIMATION_CLASS = 'js-animate-border';

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
  element.classList.add(BORDER_CLASS);
  element.classList.add(BORDER_ANIMATION_CLASS);

  element.addEventListener('animationend', () => {
    element.classList.remove(BORDER_ANIMATION_CLASS);
  }, { once: true });
}

const removeRedBorder = (element) => {
  if (element.classList.contains(BORDER_CLASS)) {
    element.classList.remove(BORDER_CLASS);
  }
}

const debounce = (cb, ms) => {
  let timer;

  return () => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = setTimeout(() => cb(), ms)
  }
}

export {
  getWordForm,
  disableElements,
  enableElements,
  addRedBorder,
  removeRedBorder,
  debounce
};
