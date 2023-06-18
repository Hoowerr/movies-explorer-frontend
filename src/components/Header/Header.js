import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/headerLogo.svg';
import menu from '../../images/headerBurger.svg';
import user from '../../images/headerUser.svg';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='header'>
      <Link to='/' className='header__homelink'>
        <img className='header__logo' src={logo} alt='логотип'></img>
      </Link>
      {location.pathname === '/' && (
        <nav className='header__signblock'>
          <Link className='header__register' to='/signup'>
            Регистрация
          </Link>
          <Link className='header__login' to='/signin'>
            Войти
          </Link>
        </nav>
      )}
      {location.pathname !== '/' && (
        <nav className='header__navblock'>
          <div className='header__navblock_films'>
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
            <img src={menu} alt='бургер меню'></img>
          </button>
        </nav>
      )}
      {<Navigation isOpen={isMenuOpen} onClose={closeMenu} />}
    </header>
  );
};

export default Header;
