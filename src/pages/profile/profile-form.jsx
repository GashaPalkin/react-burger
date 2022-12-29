import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from "./profile.module.css";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPatchRequest } from "../../services/actions/auth-actions";

export const ProfileForm = () => {
  // данные user из store
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const formInitValues = { ...user, password: "", isChanged: false };

  const [form, setValues] = useState(formInitValues);
  const [isInputChanged, setInputChanged] = useState(false);

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
    setInputChanged(true);
  };

  let updateUserData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(userPatchRequest(form));
      console.log(form);
    },
    [dispatch, form]
  );

  const onReset = (event) => {
    event.preventDefault();
    setValues(formInitValues);
  };

  return (
    <>
      <form
        onSubmit={updateUserData}
        className={`${profilePageStyles.profileForm} `}
      >
        <Input
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={onChange}
          icon="EditIcon"
        />
        <EmailInput
          value={form.email}
          name="email"
          onChange={onChange}
          icon="EditIcon"
        />
        <PasswordInput
          value={form.password}
          name="password"
          onChange={onChange}
          placeholder="Пароль"
          icon="EditIcon"
        />
        {isInputChanged && (
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
    </>
  );
};
