const ESCAPE_CODE = 'Escape';

const main = document.querySelector('main');
const requestError = document.querySelector('#request-error')
  .content
  .querySelector('.error');
const postingSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
const postingError = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorButton = postingError.querySelector('.error__button')

const cleanPopup = (popup) => {
  popup.remove();
  popup.removeEventListener('click', onPopupClick);
  window.removeEventListener('keydown', onWindowKeydown);
}

const createOnPopupClick = (popup) => () => cleanPopup(popup);

const createOnWindowKeydown = (popup) => {
  return (evt) => {
    if (evt.code === ESCAPE_CODE) {
      cleanPopup(popup);
    }
  }
}

const onErrorButtonClick = () => {
  cleanPopup(postingError);
  errorButton.removeEventListener('click', onErrorButtonClick)
}

let onPopupClick;
let onWindowKeydown;

const showPopup = (popup) => {
  main.appendChild(popup);
  popup.addEventListener('click', onPopupClick = createOnPopupClick(popup));
  window.addEventListener('keydown', onWindowKeydown = createOnWindowKeydown(popup));
  if (popup.contains(errorButton)) {
    errorButton.addEventListener('click', onErrorButtonClick)
  }
}

export { postingSuccess, postingError, requestError, showPopup };
