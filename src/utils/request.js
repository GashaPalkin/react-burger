export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
