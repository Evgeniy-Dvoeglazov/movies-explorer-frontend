import './Footer.css';
const yandexLink = 'https://practicum.yandex.ru/';
const yandexGithub = 'https://github.com/yandex-praktikum';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h2>
        <div className="footer__description">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <nav className="footer__links">
            <a className="footer__link link-opacity" href={yandexLink} target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className="footer__link link-opacity" href={yandexGithub} target="_blank" rel="noreferrer">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
