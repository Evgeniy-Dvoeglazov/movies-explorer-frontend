import './Profile.css';
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  function handleExitBtn() {
    navigate('/', { replace: true })
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Евгений</h2>
        <form className="profile__form" noValidate>
          <div className="profile__form-field">
            <label className="profile__label">Имя</label>
            <input className="profile__input" name="name" type="text" defaultValue="Евгений" />
          </div>
          <div className="profile__form-field">
            <label className="profile__label">E-mail</label>
            <input className="profile__input" name="email" type="email" defaultValue="jindv@yandex.ru" />
          </div>
          <button className="profile__submit-btn button-opacity" type="submit">Редактировать</button>
        </form>
        <button className="profile__exit-btn button-opacity" type="button" onClick={handleExitBtn}>Выйти из&nbsp;аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
