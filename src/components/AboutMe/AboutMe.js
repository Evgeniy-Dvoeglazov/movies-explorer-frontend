import './AboutMe.css';
import myPhoto from '../../images/photo.jpg'
const githubProfile = 'https://github.com/Evgeniy-Dvoeglazov';

function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__container">
        <h2 className="aboutMe__title">Студент</h2>
        <div className="aboutMe__content">
          <div className="aboutMe__text">
            <h3 className="aboutMe__name">Евгений</h3>
            <p className="aboutMe__profession">Фронтенд-разработчик, 31&nbsp;год</p>
            <p className="aboutMe__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена
              и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
              <a className="aboutMe__github-link link-opacity" href={githubProfile} target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="aboutMe__photo" src={myPhoto} alt="Мое фото" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
