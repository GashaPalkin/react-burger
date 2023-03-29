export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: { error: string }) => Promise.reject(err.error.toString()));
}
export const request = (url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse);
};
