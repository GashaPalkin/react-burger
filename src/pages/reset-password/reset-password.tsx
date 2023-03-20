import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import resetPasswordPageStyles from "./reset-password.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { resetPassword } from "../../services/actions/auth-actions";
import { Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { resetPassDone } = useAppSelector((store) => store.authReducer);

  const {
    values: { password, token },
    handleChange,
  } = useForm({ password: "", token: "" });

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(resetPassword({ password, token }));
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
    <form
      onSubmit={onSubmit}
      className={`${resetPasswordPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Восстановление пароля</h1>
      <PasswordInput
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Введите новый пароль"
      />
      <Input
        value={token}
        name="token"
        onChange={handleChange}
        placeholder="Введите код из письма"
      />
      <Button htmlType="submit">Сохранить</Button>
      <div className="text_type_main-default text_color_inactive mt-8">
        Вспомнили пароль?{" "}
        <span>
          <Link to="/login">Войти</Link>
        </span>
      </div>
    </form>
  );
};
