import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/headerLogo.svg';
import user from '../../images/headerUser.svg';
import menu from '../../images/headerBurger.svg';

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderGuestNav = () => {
    return (
      <nav className='header__signBlock'>
        <Link className='header__register' to='/signup'>
          Регистрация
        </Link>
        <Link className='header__login' to='/signin'>
          Войти
        </Link>
      </nav>
    );
  };

  const renderUserNav = () => {
    return (
      <nav className='header__navBlock'>
        <div className='header__navBlock_films'>
          <Link className='header__films link' to='/movies'>
            Фильмы
          </Link>
          <Link className='header__saved-films link' to='/saved-movies'>
            Сохраненные фильмы
          </Link>
        </div>
        <Link className='header__profile link' to='/profile'>
          Аккаунт
          <img className='header__user' src={user} alt='иконка юзер'></img>
        </Link>
        <button className='header__menu link' onClick={openMenu}>
          <img src={menu} alt='Бургер-меню'></img>
        </button>
      </nav>
    );
  };

  return (
    <header className='header'>
      <Link to='/' className='header__homeLink'>
        <img className='header__logo' src={logo} alt='логотип' />
      </Link>
      {location.pathname === '/' && !props.loggedIn && renderGuestNav()}
      {(location.pathname !== '/' || props.loggedIn) && renderUserNav()}
      <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
