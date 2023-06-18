import './Login.css';
import Form from '../Form/Form';

const Login = () => {
  return (
    <Form
      header='Рады видеть!'
      text='Ещё не зарегистрированы?'
      link='Регистрация'
      button='Войти'
      route='/signup'
      nameIsUsed={false}
    ></Form>
  );
};

export default Login;
