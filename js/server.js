const getData = (onSuccess, onFail, url) => {
  fetch(url)
    .then((response) => response.ok ? response.json() : onFail())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
}

const sendData = (onSuccess, onFail, body, url) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail())
    .catch(() => onFail());
}

export { getData, sendData };
