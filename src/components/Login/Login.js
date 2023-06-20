import './Login.css';
// import Form from '../Form/Form';

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <button className="logo button-opacity" type="button" aria-label="Кнопка перехода на главную страницу">
        </button>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form">
          <div className="login__form-field login__form-field_invisible">
            <label className="login__label">Имя</label>
            <input className="login__input" name="имя" type="text" placeholder="" />
          </div>
          <div className="login__form-field">
            <label className="login__label">E-mail</label>
            <input className="login__input" name="email" type="email" placeholder="" />
          </div>
          <div className="login__form-field">
            <label className="login__label">Пароль</label>
            <input className="login__input" name="пароль" type="password" placeholder="" />
          </div>
          <button className="login__button button-opacity" type="submit">Войти</button>
        </form>
        <p className="login__question">Ещё не зарегистрированы? <a href="#" className="login__link link-opacity" rel="noreferrer">Регистрация</a></p>
      </div>
    </section>
  );
}

export default Login;
