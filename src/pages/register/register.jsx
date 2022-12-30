import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../services/actions/auth-actions";
import registerPageStyles from "./register.module.css";
import { Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
  // данные user из store
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  // VER 1
  // const [form, setValue] = useState({ name: "", email: "", password: "" });
  // const onChange = (e) => {
  //   setValue({ ...form, [e.target.name]: e.target.value });
  // };
  // let register = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     dispatch(registerRequest(form));
  //   },
  //   [dispatch, form]
  // );

  // VER 2
  const {
    values: { name, email, password },
    handleChange,
  } = useForm({ name: "", email: "", password: "" });

  const onSubmit = (event) => {
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
