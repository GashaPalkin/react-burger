import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import loginPageStyles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../services/actions/auth-actions";
import { Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // ! типизировать store в следующем спринте
  // @ts-ignore
  const { user } = useSelector((store) => store.authReducer);

  const {
    values: { email, password },
    handleChange,
  } = useForm({ email: "", password: "" });

  const onSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    // @ts-ignore
    dispatch(loginRequest({ email, password }));
  };

  if (user) {
    // @ts-ignore
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`${loginPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Вход</h1>
      <EmailInput value={email} name="email" onChange={handleChange} />
      <PasswordInput value={password} name="password" onChange={handleChange} />
      <Button htmlType="submit">Войти</Button>
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
    </form>
  );
};
