import './Login.css';
import Form from '../Form/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login(props) {

  const { register, formState: { errors, isValid }, getValues } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const navigate = useNavigate();

  const errorClassname = (name) => `form__error ${errors[name] ? 'form__error_visible' : ''}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!getValues('email') || !getValues('password')) {
      return;
    }
    props.onLogin(getValues('password'), getValues('email'));
  }

  function handleClickLogo() {
    navigate('/', { replace: true });
  }

  return (
    <section className="login">
      <div className="login__container">
        <button className="logo logo_form button-opacity" type="button" aria-label="Кнопка перехода на главную страницу" onClick={handleClickLogo}>
        </button>
        <h2 className="login__title">Рады видеть!</h2>
        <Form
          serverError={props.serverError}
          buttonText="Войти"
          onSubmit={handleSubmit}
          isValid={isValid}
          isLoading={props.isLoading}
          children={
            <>
              <div className="form__form-field">
                <label className="form__label">E-mail</label>
                <input className={`form__input ${errors.email ? 'form__input_red' : ''}`} disabled={props.isLoading} name="email" type="email" placeholder=""
                  {...register('email', {
                    required: 'Заполните это поле.',
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Введите Email'
                    }
                  })}
                />
                {errors.email && <span className={errorClassname('email')}>{errors.email.message}</span>}
              </div>
              <div className="form__form-field">
                <label className="form__label">Пароль</label>
                <input className={`form__input ${errors.password ? 'form__input_red' : ''}`} name="password" type="password" disabled={props.isLoading} placeholder=""
                  {...register('password', {
                    required: 'Заполните это поле.'
                  })}
                />
                {errors.password && <span className={errorClassname('password')}>{errors.password.message}</span>}
              </div>
              <div className="form__emptiness"></div>
            </>
          }
        />
        <p className="login__question">Ещё не зарегистрированы? <Link to="/signup" className="login__link link-opacity">Регистрация</Link></p>
      </div>
    </section>
  );
}

export default Login;
