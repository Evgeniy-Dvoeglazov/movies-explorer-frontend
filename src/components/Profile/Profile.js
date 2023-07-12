import './Profile.css';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);

  const { register, formState: { errors, isValid }, getValues, setValue } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `profile__error ${errors[name] ? 'profile__error_visible' : ''}`;

  function handleExitBtn() {
    props.onSignOut();
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: getValues('name'),
      email: getValues('email')
    });
  }

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
  }, [currentUser]);

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Евгений</h2>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__form-field">
            <label className="profile__label">Имя</label>
            <input className={`profile__input ${errors.name ? 'profile__input_red' : ''}`} name="name" type="text"
              {...register('name', {
                required: 'Заполните это поле.',
                minLength: {
                  value: 2,
                  message: 'Текст должен быть не короче 2 символов.'
                }
              })}
            />
          </div>
          {errors.name && <span className={errorClassname('name')}>{errors.name.message}</span>}
          <div className="profile__form-field">
            <label className="profile__label">E-mail</label>
            <input className={`profile__input ${errors.email ? 'profile__input_red' : ''}`} name="email" type="email"
              {...register('email', {
                required: 'Заполните это поле.',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Введите Email'
                }
              })}
            />
          </div>
          {errors.email && <span className={errorClassname('email')}>{errors.email.message}</span>}
          <button className={`profile__submit-btn button-opacity ${isValid ? '' : 'profile__submit-btn_disabled'}`} disabled={props.isLoading} type="submit">Редактировать</button>
        </form>
        <button className="profile__exit-btn button-opacity" type="button" onClick={handleExitBtn}>Выйти из&nbsp;аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
