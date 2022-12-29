import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import loginPageStyles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { loginRequest } from "../../services/actions/auth-actions";
import { Redirect } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  // данные user из store
  const { user } = useSelector((store) => store.authReducer);
  const [form, setValue] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  let login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequest(form));
    },
    [dispatch, form]
  );

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div
      className={`${loginPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Вход</h1>
      <EmailInput value={form.email} name="email" onChange={onChange} />
      <PasswordInput
        value={form.password}
        name="password"
        onChange={onChange}
      />
      <Button htmlType="submit" onClick={login}>
        Войти
      </Button>
      <div className="text_type_main-default text_color_inactive mt-8">
        Вы новый пользователь?{" "}
        <span>
          <Link to="/register">Зарегистрироваться</Link>
        </span>
      </div>
      <div className="text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <span>
          <Link to="/forgot-password">Восстановить пароль</Link>
        </span>
      </div>
    </div>
  );
};
