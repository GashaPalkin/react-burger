import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import forgotPasswordPageStyles from "./forgot-password.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { Redirect } from "react-router-dom";
import { resetPasswordRequest } from "../../services/actions/auth-actions";
import { useForm } from "../../hooks/useForm";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { sentResetSuccess } = useAppSelector((store) => store.authReducer);

  const {
    values: { email },
    handleChange,
  } = useForm({ email: "" });

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault(); 
    dispatch(resetPasswordRequest({ email }));
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
    <form
      onSubmit={onSubmit}
      className={`${forgotPasswordPageStyles.wrapper} container centerBlock centerText mt-10 `}
    >
      <h1 className="text text_type_main-medium mb-1">Восстановление пароля</h1>
      <EmailInput value={email} name="email" onChange={handleChange} />
      <Button htmlType="submit">Восстановить</Button>
      <div className="text_type_main-default text_color_inactive mt-8">
        Вспомнили пароль?{" "}
        <span>
          <Link to="/login">Войти</Link>
        </span>
      </div>
    </form>
  );
};
