import { useAppDispatch } from '@/hooks/dispatch';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UPDATE_USER_SUCCESS } from '../../services/actions/auth.js';
import { updateUser } from '@utils/Api/updateUser.js';

import type { ChangeEvent, FC, FormEvent } from 'react';

import styles from './profile-settings-page.module.css';

export const ProfileSettingsPage: FC = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [change, setChange] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChange(true);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(formData.email, formData.name, formData.password)
      .then((res) => {
        dispatch({ type: UPDATE_USER_SUCCESS, user: res.user });
      })
      .catch((error) => console.error(error));
  };

  const handleCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(user ? user : { name: '', email: '' });
    setChange(false);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        extraClass="mb-6"
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        value={formData.name || ''}
        onChange={handleChange}
      />
      <EmailInput
        extraClass="mb-6"
        name="email"
        icon="EditIcon"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        icon="EditIcon"
        value={formData.password || ''}
        onChange={handleChange}
      />
      {change && (
        <div className={`${styles.actions} mt-5`}>
          <Button type="secondary" htmlType="reset" onClick={handleCancel}>
            Отмена
          </Button>
          <Button type="primary" extraClass="ml-5" htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
