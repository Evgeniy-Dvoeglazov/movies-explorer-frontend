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
          <li className="portfolio__item">
            <p className="portfolio__item-name">Статичный сайт</p>
            <a className="portfolio__item-link" href={staticSite} target="_blank" rel="noopener noreferrer">&#8599;</a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-name">Адаптивный сайт</p>
            <a className="portfolio__item-link" href={adaptiveSite} target="_blank" rel="noopener noreferrer">&#8599;</a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-name">Одностраничное приложение</p>
            <a className="portfolio__item-link" href={singlePageApp} target="_blank" rel="noopener noreferrer">&#8599;</a>
          </li>
        </ul>
      </div>
    </section >
  );
}

export default Portfolio;
