import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__header '>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__copyright'>© {new Date().getFullYear()}</p>
        <div className='footer__links'>
          <a
            className='footer__link'
            href='https://practicum.yandex.ru/'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href='https://github.com/Hoowerr'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
