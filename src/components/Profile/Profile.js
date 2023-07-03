import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
    props.setApiSuccess(false);
    props.setApiError('');
  }, [currentUser, resetForm]);

  const isNewData =
    values.name !== currentUser.name || values.email !== currentUser.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name: values.name || currentUser.name,
      login: values.login || currentUser.email,
    };
    props.handleUpdateUser(updatedUser);
  };

  const isFormInvalid =
    props.blockForm ||
    !isValid ||
    (errors.name !== undefined && errors.name !== '') ||
    (errors.login !== undefined && errors.login !== '');

  return (
    <div className='profile'>
      <h1 className='profile__header'>{`Привет, ${currentUser.name}!`}</h1>
      <form noValidate></form>
      <form>
        <div className='profile__container'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='profile__input'
            placeholder='Имя'
            name='name'
            id='name'
            minLength='2'
            maxLength='30'
            required
            onChange={handleChange}
            defaultValue={currentUser.name}
            disabled={props.blockForm}
          />
        </div>
        {errors.name && <span className='form__error'>{errors.name}</span>}
        <div className='profile__container'>
          <label className='profile__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className='profile__input'
            type='email'
            placeholder='Почта'
            name='login'
            id='email'
            onChange={handleChange}
            defaultValue={currentUser.email}
            required
            disabled={props.blockForm}
          />
        </div>
        {errors.login && <span className='form__error'>{errors.login}</span>}

        {props.apiError !== '' && (
          <span className='form__error'>{props.apiError}</span>
        )}
        {props.apiSuccess && (
          <span className='profile__success'>Данные успешно сохранены</span>
        )}
      </form>
      <div className='profile__buttons'></div>
      <button
        type='submit'
        onClick={handleSubmit}
        className={`profile__button ${
          isFormInvalid & isNewData ? 'profile__button_disabled' : ''
        }`}
        disabled={isFormInvalid || !isNewData}
      >
        Редактировать
      </button>
      <NavLink to='/' className='profile__button_exit' onClick={props.onClick}>
        Выйти из аккаунта
      </NavLink>
    </div>
  );
};

export default Profile;
