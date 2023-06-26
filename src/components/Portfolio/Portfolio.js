import './Portfolio.css';
const staticSite = 'https://github.com/Evgeniy-Dvoeglazov/how-to-learn';
const adaptiveSite = 'https://github.com/Evgeniy-Dvoeglazov/russian-travel';
const singlePageApp = 'https://github.com/Evgeniy-Dvoeglazov/react-mesto-api-full-gha';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li>
            <a className="portfolio__item link-opacity" href={staticSite} target="_blank" rel="noreferrer">
              <p className="portfolio__item-name">Статичный сайт</p>
              <p className="portfolio__item-arrow">&#8599;</p>
            </a>
          </li>
          <li>
            <a className="portfolio__item link-opacity" href={adaptiveSite} target="_blank" rel="noreferrer">
              <p className="portfolio__item-name">Адаптивный сайт</p>
              <p className="portfolio__item-arrow">&#8599;</p>
            </a>
          </li>
          <li>
            <a className="portfolio__item link-opacity portfolio__item_last" href={singlePageApp} target="_blank" rel="noreferrer">
              <p className="portfolio__item-name">Одностраничное приложение</p>
              <p className="portfolio__item-arrow">&#8599;</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
