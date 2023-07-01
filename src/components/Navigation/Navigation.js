import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import user from '../../images/headerUser.svg';
import closeButton from '../../images/closeButton.svg';
import './Navigation.css';

const Navigation = (props) => {
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Главная' },
    { path: '/movies', name: 'Фильмы' },
    { path: '/saved-movies', name: 'Сохраненные фильмы' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path ? 'navigation__link_active' : '';
  };

  const renderNavLinks = () => {
    return navLinks.map((link, index) => (
      <NavLink
        key={index}
        to={link.path}
        className={`navigation__link ${isActiveLink(link.path)}`}
        onClick={props.onClose}
      >
        {link.name}
      </NavLink>
    ));
  };

  return (
    <nav className={`navigation ${props.isOpen ? 'navigation_opened' : ''}`}>
      <div className='navigation__overlay'></div>
      <button className='navigation__close' onClick={props.onClose}>
        <img src={closeButton} alt='закрыть'></img>
      </button>
      {renderNavLinks()}
      <NavLink
        to='/profile'
        className={`navigation__link ${isActiveLink('/profile')}`}
        onClick={props.onClose}
      >
        Аккаунт
        <img className='navigation__link-user' src={user} alt='аватарка'></img>
      </NavLink>
    </nav>
  );
};

export default Navigation;
