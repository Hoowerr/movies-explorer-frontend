import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <a
        className='portfolio__link'
        href='https://github.com/Hoowerr/how-to-learn'
        rel='noreferrer'
        target='_blank'
      >
        Статичный сайт
      </a>
      <a
        className='portfolio__link'
        href='https://github.com/Hoowerr/russian-travel'
        rel='noreferrer'
        target='_blank'
      >
        Адаптивный сайт
      </a>
      <a
        className='portfolio__link'
        href='https://github.com/Hoowerr/mesto-react'
        rel='noreferrer'
        target='_blank'
      >
        Одностраничное приложение
      </a>
    </div>
  );
};
export default Portfolio;
