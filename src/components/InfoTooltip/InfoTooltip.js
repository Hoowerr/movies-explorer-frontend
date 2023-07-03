import React, { useEffect } from 'react';
import './InfoTooltip.css';

import ok from '../../images/ok.svg';
import notOk from '../../images/notOk.svg';

function InfoTooltip(props) {
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener('keydown', closeByEscape);
    }

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [props.isOpen, props.onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div
        className='popup__container popup__container_type_input popup__container_type_signature'
        onClick={handleOverlayClick}
      >
        <button
          className='button popup__exit-button'
          aria-label='Закрыть'
          type='button'
          onClick={props.onClose}
        ></button>
        <img
          className='infotooltip__image'
          src={props.isSuccessful ? ok : notOk}
          alt={props.isSuccessful ? 'Успех!' : 'Ошибка'}
        />
        <h2 className='popup__signature'>{props.message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
