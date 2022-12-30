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

export const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // данные user из store
  const { user } = useSelector((store) => store.authReducer);
  // VER 1
  // const [form, setValue] = useState({ email: "", password: "" });
  // const onChange = (e) => {
  //   setValue({ ...form, [e.target.name]: e.target.value });
  // };
  // const login = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     dispatch(loginRequest(form));
  //   },
  //   [dispatch, form]
  // );

  // VER 2
  const {
    values: { email, password },
    handleChange,
  } = useForm({ email: "", password: "" });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  if (user) {
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
