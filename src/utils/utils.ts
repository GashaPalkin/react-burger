// для удобного доступа к куке, нам потребуется ещё одна функция / вызываем в auth-reducer? или в actions?
export function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// эта функция нормализует работу с временем жизни куки и обрабатывает те случаи, когда время жизни куки не было передано. 
export function setCookie(name: string, value: string, props?: Record<string, unknown>) {
  // чтобы записать в корень
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}
// находим куку по ключу token, удаляем её значение, 
// устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}