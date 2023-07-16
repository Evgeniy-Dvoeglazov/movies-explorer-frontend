import './Register.css';
import Form from '../Form/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Register(props) {

  const { register, formState: { errors, isValid }, getValues } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const navigate = useNavigate();

  const errorClassname = (name) => `form__error ${errors[name] ? 'form__error_visible' : ''}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(getValues('name'), getValues('email'), getValues('password'));
  }

  function handleClickLogo() {
    navigate('/', { replace: true });
  }

  return (
    <section className="register">
      <div className="register__container">
        <button className="logo logo_form button-opacity" type="button" aria-label="Кнопка перехода на главную страницу" onClick={handleClickLogo}>
        </button>
        <h2 className="register__title">Добро пожаловать!</h2>
        <Form
          serverError={props.serverError}
          buttonText="Зарегистрироваться"
          onSubmit={handleSubmit}
          isValid={isValid}
          children={
            <>
              <div className="form__form-field">
                <label className="form__label">Имя</label>
                <input className={`form__input ${errors.name ? 'form__input_red' : ''}`} name="name" type="text" placeholder=""
                  {...register('name', {
                    required: 'Заполните это поле.',
                    minLength: {
                      value: 2,
                      message: 'Текст должен быть не короче 2 символов.'
                    }
                  })}
                />
                {errors.name && <span className={errorClassname('name')}>{errors.name.message}</span>}
              </div>
              <div className="form__form-field">
                <label className="form__label">E-mail</label>
                <input className={`form__input ${errors.email ? 'form__input_red' : ''}`} name="email" type="email" placeholder=""
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
                <input className={`form__input ${errors.password ? 'form__input_red' : ''}`} name="password" type="password" placeholder=""
                  {...register('password', {
                    required: 'Заполните это поле.',
                    minLength: {
                      value: 5,
                      message: 'Текст должен быть не короче 5 символов.'
                    },
                    maxLength: {
                      value: 12,
                      message: 'Текст должен быть не длиннее 12 символов.'
                    }
                  })}
                />
                {errors.password && <span className={errorClassname('password')}>{errors.password.message}</span>}
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
