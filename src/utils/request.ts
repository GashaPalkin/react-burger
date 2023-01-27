export const checkResponse = <T>(res: { ok: any; json: () => Promise<T> | Promise<string | Error>; }) => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return (res.json() as Promise<Error>).then((err) => Promise.reject(err));
};

export const request = (url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse);
};
