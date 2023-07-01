import { Link, useLocation } from 'react-router-dom';
import './Form.css';
import headerlogo from '../../images/headerLogo.svg';

const Form = (props) => {
  const location = useLocation().pathname;

  const renderNameField = () => {
    if (props.nameIsUsed) {
      return (
        <>
          <label className='form__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='form__input'
            type='text'
            placeholder='Имя'
            name='name'
            id='name'
            minLength='2'
            maxLength='30'
            required
            onChange={props.handleChange}
            disabled={props.blockForm}
          />
          {props.errors.name && (
            <span className='form__error'>{props.errors.name}</span>
          )}
        </>
      );
    }
    return null;
  };

  const renderButtonClassName = () => {
    if (location === '/register') {
      return !props.isValid || props.errors.name || props.errors.login
        ? 'form__button_disabled'
        : 'form__button_active';
    }

    return props.blockForm || !props.isValid || props.errors.login
      ? 'form__button_disabled'
      : 'form__button_active';
  };

  const renderButtonDisabled = () => {
    if (location === '/register') {
      return !props.isValid || props.errors.name || props.errors.login;
    }

    return props.blockForm || !props.isValid || props.errors.login;
  };

  return (
    <div className='form'>
      <Link className='link' to='/'>
        <img className='form__logo' src={headerlogo} alt='логотип' />
      </Link>
      <h2 className='form__header'>{props.header}</h2>
      <form className='form__inputs' onSubmit={props.handleSubmit} noValidate>
        {renderNameField()}
        <label className='form__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className='form__input'
          placeholder='E-mail'
          id='login'
          name='login'
          type='email'
          required
          onChange={props.handleChange}
          disabled={props.blockForm}
        />
        {props.errors.login && (
          <span className='form__error'>{props.errors.login}</span>
        )}
        <label className='form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='form__input'
          placeholder='Пароль'
          name='password'
          minLength='8'
          type='password'
          id='password'
          onChange={props.handleChange}
          disabled={props.blockForm}
          required
        />
        {props.registerError !== '' && (
          <span className='form__error'>{props.registerError}</span>
        )}
        <button
          type='submit'
          className={`form__button link ${renderButtonClassName()}`}
          disabled={renderButtonDisabled()}
        >
          {props.button}
        </button>
      </form>
      <div className='form__bottom'>
        <p className='form__bottom_text'>{props.text}</p>
        <Link to={props.route} className='form__link link'>
          {props.link}
        </Link>
      </div>
    </div>
  );
};

export default Form;
