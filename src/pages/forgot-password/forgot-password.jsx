import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import forgotPasswordPageStyles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { resetPasswordRequest } from "../../services/actions/auth-actions";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { sentResetSuccess } = useSelector((store) => store.authReducer);
  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const sentResetRequest = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(form));
  };

  if (sentResetSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
          state: { from: "/forgot-password" },
        }}
      />
    );
  }
  return (
    <div
      className={`${forgotPasswordPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Восстановление пароля</h1>
      <EmailInput value={form.email} name="email" onChange={onChange} />
      <Button htmlType="submit" onClick={sentResetRequest}>
        Восстановить
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
