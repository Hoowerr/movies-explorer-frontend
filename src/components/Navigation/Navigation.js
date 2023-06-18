import { NavLink } from 'react-router-dom';
import user from '../../images/headerUser.svg';
import closeButton from '../../images/closeButton.svg';
import './Navigation.css';

const Navigation = (props) => {
  return (
    <nav className={`navigation ${props.isOpen ? 'navigation_opened' : ''}`}>
      <div className='navigation__overlay'></div>
      <button className='navigation__close' onClick={props.onClose}>
        <img src={closeButton} alt='закрыть'></img>
      </button>
      <NavLink
        exact
        to='/'
        activeClassName='navigation__link_active'
        className='navigation__link'
        onClick={props.onClose}
      >
        Главная
      </NavLink>
      <NavLink
        exact
        to='/movies'
        activeClassName='navigation__link_active'
        className='navigation__link'
        onClick={props.onClose}
      >
        Фильмы
      </NavLink>
      <NavLink
        exact
        to='/saved-movies'
        activeClassName='navigation__link_active'
        className='navigation__link'
        onClick={props.onClose}
      >
        Сохраненные фильмы
      </NavLink>
      <NavLink
        exact
        to='/profile'
        activeClassName='navigation__link_active'
        className='navigation__link'
        onClick={props.onClose}
      >
        Аккаунт
        <img className='navigation__link-user' src={user} alt='аватарка'></img>
      </NavLink>
    </nav>
  );
};

export default Navigation;
