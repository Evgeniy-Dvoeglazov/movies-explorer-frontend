import './Login.css';
import Form from '../Form/Form';

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <button className="logo button-opacity" type="button" aria-label="Кнопка перехода на главную страницу">
        </button>
        <h2 className="login__title">Рады видеть!</h2>
        <Form
          buttonText="Войти"
          children={
            <>
              <div className="form__form-field">
                <label className="form__label">E-mail</label>
                <input className="form__input" name="email" type="email" placeholder="" />
              </div>
              <div className="form__form-field">
                <label className="form__label">Пароль</label>
                <input className="form__input" name="пароль" type="password" placeholder="" />
              </div>
              <div className="form__emptiness"></div>
            </>
          }
        />
        <p className="login__question">Ещё не зарегистрированы? <a href="#" className="login__link link-opacity" rel="noreferrer">Регистрация</a></p>
      </div>
    </section>
  );
}

export default Login;
