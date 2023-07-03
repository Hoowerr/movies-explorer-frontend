import avatar from '../../images/avatar.jpg';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className='aboutMe'>
      <h2 className='aboutMe__header'>Студент</h2>
      <div className='aboutMe__description'>
        <img
          className='aboutMe__description-photo'
          alt='avatar'
          src={avatar}
        ></img>
        <div className='aboutMe__description-info'>
          <h3 className='aboutMe__title'>Магомед</h3>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 32 года</p>
          <p className='aboutMe__caption'>
            Я родился в городе Грозный. Я выбрал веб-разработку, потому что это
            интересно и динамично развивающееся направление. Моя цель -
            создавать эффективные и удобные веб-сайты и приложения, используя
            современные информационные технологии.
          </p>
          <div className='aboutMe__links'>
            <a
              className='aboutMe__link'
              href='https://github.com/Hoowerr'
              rel='noreferrer'
              target='_blank'
            >
              Github
            </a>
          </div>
        </div>
      </div>
      <Portfolio />
    </div>
  );
};

export default AboutMe;
