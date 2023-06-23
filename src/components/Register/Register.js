import './Register.css';
import Form from '../Form/Form';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  function handleSubmit() {
    navigate('/signin', { replace: true });
  }

  return (
    <section className="register">
      <div className="register__container">
        <button className="logo logo_form button-opacity" type="button" aria-label="Кнопка перехода на главную страницу">
        </button>
        <h2 className="register__title">Добро пожаловать!</h2>
        <Form
          buttonText="Зарегистрироваться"
          onSubmit={handleSubmit}
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
        <p className="register__question">Уже зарегистрированы? <Link to="/signin" className="register__link link-opacity" rel="noreferrer">Войти</Link></p>
      </div>
    </section>
  );
}

export default Register;
