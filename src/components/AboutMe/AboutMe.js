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
            <p className="aboutMe__description">Я&nbsp;родился в&nbsp;Кировской области. Сейчас живу в&nbsp;Нижнем Новгороде. Закончил НГТУ им. Р.Е. Алексеева (ИРИТ). На&nbsp;данный момент таргетолог-фрилансер, параллельно погружающийся в&nbsp;мир веб-разработки.</p>
            <p className="aboutMe__description">Люблю дальние путешествия на&nbsp;машине и&nbsp;отдых на&nbsp;природе с&nbsp;палатками.</p>
            <a className="aboutMe__github-link link-opacity" href={githubProfile} target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="aboutMe__photo" src={myPhoto} alt="Мое фото" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
