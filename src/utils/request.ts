// комментарий из ревью
// { ok: any; json: () => Promise<T> | Promise<string | Error>; }
// для этого есть встроенный тип Response
// export const checkResponse = <T>(res: Response) => {

// old version
// export const checkResponse = <T>(res: { ok: any; json: () => Promise<T> | Promise<string | Error>; }) => {
//   if (res.ok) {
//     return res.json() as Promise<T>;
//   }
//   return (res.json() as Promise<Error>).then((err) => Promise.reject(err));
// };

// new version
export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
}

export const request = (url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse);
};
