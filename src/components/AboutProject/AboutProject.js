import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <div className="aboutProject__container">
        <h2 className="aboutProject__title">О&nbsp;проекте</h2>
        <ul className="aboutProject__text">
          <li className="aboutProject__list-item">
            <h3 className="aboutProject__text-title">Дипломный проект включал 5&nbsp;этапов</h3>
            <p className="aboutProject__text-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </li>
          <li className="aboutProject__list-item">
            <h3 className="aboutProject__text-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
            <p className="aboutProject__text-description">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="aboutProject__workTime">
          <figure className="aboutProject__figure aboutProject__figure_backend">
            <p className="aboutProject__weeks aboutProject__weeks_bgGreen">1 неделя</p>
            <figcaption className="aboutProject__caption">Back-end</figcaption>
          </figure>
          <figure className="aboutProject__figure aboutProject__figure_frontend">
            <p className="aboutProject__weeks aboutProject__weeks_bgGrey">4 недели</p>
            <figcaption className="aboutProject__caption">Front-end</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
