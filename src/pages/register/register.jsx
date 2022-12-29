import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../services/actions/auth-actions";
import registerPageStyles from "./register.module.css";
import { Redirect } from "react-router-dom";

export const RegisterPage = () => {
  // данные user из store
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let register = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerRequest(form));
      console.log(form);
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
      className={`${registerPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Регистрация</h1>
      <Input
        value={form.name}
        name="name"
        onChange={onChange}
        type="text"
        placeholder="Имя"
      />
      <EmailInput value={form.email} name="email" onChange={onChange} />
      <PasswordInput
        value={form.password}
        name="password"
        onChange={onChange}
      />
      <Button htmlType="submit" onClick={register}>
        Зарегистрироваться
      </Button>
      <div className="text_type_main-default text_color_inactive mt-8">
        Уже зарегистрированы?{" "}
        <span>
          <Link to="/login">Войти</Link>
        </span>
      </div>
    </div>
  );
};
