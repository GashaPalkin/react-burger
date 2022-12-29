import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import resetPasswordPageStyles from "./reset-password.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/auth-actions";
import { Redirect } from "react-router-dom";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { resetPassDone } = useSelector((store) => store.authReducer);
  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  if (resetPassDone) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: "/reset-password" },
        }}
      />
    );
  }

  return (
    <div
      className={`${resetPasswordPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Восстановление пароля</h1>
      <PasswordInput
        value={form.password}
        name="password"
        onChange={onChange}
        placeholder="Введите новый пароль"
      />
      <Input
        value={form.token}
        name="token"
        onChange={onChange}
        placeholder="Введите код из письма"
      />
      <Button htmlType="submit" onClick={resetPasswordHandler}>
        Сохранить
      </Button>
      <div className="text_type_main-default text_color_inactive mt-8">
        Вспомнили пароль?{" "}
        <span>
          <Link to="/login">Войти</Link>
        </span>
      </div>
    </div>
  );
};
