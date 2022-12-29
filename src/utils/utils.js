// Для удобного доступа к куке, нам потребуется ещё одна функция / вызываем в auth-reducer? или в actions?
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Эта функция нормализует работу с временем жизни куки и обрабатывает те случаи, когда время жизни куки не было передано. 
export function setCookie(name, value, props = {}) {
  // чтобы записать в корень
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
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
// Находим куку по ключу token, удаляем её значение, 
// устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}