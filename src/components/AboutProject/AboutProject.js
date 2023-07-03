import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='aboutProject '>
      <div className='aboutProject__container'>
        <h2 className='aboutProject__title'>О проекте</h2>
        <ul className='aboutProject__definition-list'>
          <li className='aboutProject__definition-item'>
            <h3 className='aboutProject__definition-title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='aboutProject__definition-description'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className='aboutProject__definition-item'>
            <h3 className='aboutProject__definition-title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='aboutProject__definition-description'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className='aboutProject__scheme'>
          <div className='aboutProject__backend'>
            <span className='aboutProject__backend-duration'>1 неделя</span>
            <span className='aboutProject__scheme-title'>Back-end</span>
          </div>
          <div className='aboutProject__frontend'>
            <span className='aboutProject__frontend-duration'>4 недели</span>
            <span className='aboutProject__scheme-title'>Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}
