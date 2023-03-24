import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { registerRequest } from "../../services/actions/auth-actions";
import registerPageStyles from "./register.module.css";
import { Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";

export const RegisterPage = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();
  const {
    values: { name, email, password },
    handleChange,
  } = useForm({ name: "", email: "", password: "" });

  const onSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    dispatch(registerRequest({ name, email, password }));
  };

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
    <form
      onSubmit={onSubmit}
      className={`${registerPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Регистрация</h1>
      <Input
        value={name}
        name="name"
        onChange={handleChange}
        type="text"
        placeholder="Имя"
      />
      <EmailInput value={email} name="email" onChange={handleChange} />
      <PasswordInput value={password} name="password" onChange={handleChange} />
      <Button htmlType="submit">Зарегистрироваться</Button>
      <div className="text_type_main-default text_color_inactive mt-8">
        Уже зарегистрированы?{" "}
        <span>
          <Link to="/login">Войти</Link>
        </span>
      </div>
    </form>
  );
};
