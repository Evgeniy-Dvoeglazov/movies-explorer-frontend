import './Register.css';
import Form from '../Form/Form';

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <button className="logo button-opacity" type="button" aria-label="Кнопка перехода на главную страницу">
        </button>
        <h2 className="register__title">Добро пожаловать!</h2>
        <Form
          buttonText="Зарегистрироваться"
          children={
            <>
              <div className="form__form-field">
                <label className="form__label">Имя</label>
                <input className="form__input" name="имя" type="text" placeholder="" />
              </div>
              <div className="form__form-field">
                <label className="form__label">E-mail</label>
                <input className="form__input" name="email" type="email" placeholder="" />
              </div>
              <div className="form__form-field">
                <label className="form__label">Пароль</label>
                <input className="form__input" name="пароль" type="password" placeholder="" />
              </div>
            </>
          }
        />
        <p className="register__question">Уже зарегистрированы? <a href="#" className="register__link link-opacity" rel="noreferrer">Войти</a></p>
      </div>
    </section>
  );
}

export default Register;
