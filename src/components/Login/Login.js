import React, { useEffect } from 'react';
import './Login.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/Validation';

const Login = (props) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin({
      login: values.login,
      password: values.password,
    });
  };

  useEffect(() => {
    resetForm();
    props.setApiError('');
  }, [resetForm]);

  return (
    <Form
      header='Рады видеть!'
      text='Ещё не зарегистрированы?'
      button='Войти'
      route='/signup'
      link='Регистрация'
      nameIsUsed={false}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      errors={errors}
      isValid={isValid}
      blockForm={props.blockForm}
      registerError={props.registerError}
    />
  );
};

export default Login;
