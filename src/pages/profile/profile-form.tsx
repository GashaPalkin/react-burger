import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from "./profile.module.css";
import { ChangeEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { userPatchRequest } from "../../services/actions/auth-actions";
import { useForm } from "../../hooks/useForm";

export const ProfileForm = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();  
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
      isChanged: true,
    }));
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const body = Object.assign({ name, email }, password ? { password } : {}); 
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
        value={name as string}
        onChange={handleChangeValues}
        icon="EditIcon"
      />
      <Input
        value={email as string}
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
