import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from "./profile.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPatchRequest } from "../../services/actions/auth-actions";
import { useForm } from "../../hooks/useForm";

export const ProfileForm = () => {
  // данные user из store
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const formInitValues = { ...user, password: "", isChanged: false };

  // VER 1
  // const [form, setValues] = useState(formInitValues);
  // const [isInputChanged, setInputChanged] = useState(false);
  // const onChange = (e) => {
  //   setValues({ ...form, [e.target.name]: e.target.value });
  //   setInputChanged(true);
  // };
  // let updateUserData = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     dispatch(userPatchRequest(form));
  //   },
  //   [dispatch, form]
  // );

  // VER 2
  const {
    values: { name, email, password, isChanged },
    handleChange,
    setValues,
  } = useForm(formInitValues);

  const handleChangeValues = (e) => {
    handleChange(e);
    setValues((prev) => ({
      ...prev,
      isChanged: formInitValues[e.target.name] !== e.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const body = Object.assign({ name, email }, password ? { password } : {});
    dispatch(userPatchRequest(body));
  };

  const onReset = (event) => {
    event.preventDefault();
    setValues(formInitValues);
  };

  useEffect(() => {
    setValues(formInitValues);
  }, [user]);

  return (
    <form onSubmit={onSubmit} className={`${profilePageStyles.profileForm} `}>
      <Input
        placeholder="Имя"
        name="name"
        value={name}
        onChange={handleChangeValues}
        icon="EditIcon"
      />
      <EmailInput
        value={email}
        name="email"
        onChange={handleChangeValues}
        icon="EditIcon"
      />
      <PasswordInput
        value={password}
        name="password"
        onChange={handleChangeValues}
        placeholder="Пароль"
        icon="EditIcon"
      />
      {isChanged && (
        <div className={profilePageStyles.buttons}>
          <Button
            className={`${profilePageStyles.buttonLink} text text_type_main-small`}
            onClick={onReset}
          >
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
