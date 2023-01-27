import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from "./profile.module.css";
import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPatchRequest } from "../../services/actions/auth-actions";
import { useForm } from "../../hooks/useForm";

export const ProfileForm = () => {
  // ! типизировать store в следующем спринте
  // @ts-ignore
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const formInitValues = { ...user, password: "", isChanged: false };

  const {
    values: { name, email, password, isChanged },
    handleChange,
    setValues,
  } = useForm(formInitValues);

  const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setValues((prev: any) => ({
      ...prev,
      isChanged: formInitValues[e.target.name] !== e.target.value,
    }));
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const body = Object.assign({ name, email }, password ? { password } : {});
    // @ts-ignore
    dispatch(userPatchRequest(body));
  };

  const onReset = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues(formInitValues);
  };

  useEffect(() => {
    setValues(formInitValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Input
        value={email}
        placeholder="Email"
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
            htmlType={"button"}
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
