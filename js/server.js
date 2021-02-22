const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.ok ? response.json() : onFail())
    .then((ads) => onSuccess(ads))
    .catch(() => onFail());
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail())
    .catch(() => onFail());
}

export { getData, sendData };
