import React, { useEffect } from 'react';
import './Register.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/Validation';

const Register = (props) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister({
      name: values.name,
      login: values.login,
      password: values.password,
    });
  };

  useEffect(() => {
    resetForm();
    props.setApiError('');
  }, [resetForm, props.setApiError]);

  return (
    <Form
      route='/signin'
      button='Зарегистрироваться'
      header='Добро пожаловать!'
      link='Войти'
      text='Уже зарегистрированы?'
      registerError={props.registerError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      blockForm={props.blockForm}
      isValid={isValid}
      nameIsUsed={true}
      values={values}
      errors={errors}
    />
  );
};

export default Register;
