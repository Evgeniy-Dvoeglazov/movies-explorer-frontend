import './Profile.css';
import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const [currentDataError, setCurrentDataError] = useState(false);

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

  function checkCurrentData(e) {
    props.changeVisibleProfileError();
    if (e.target.value === (currentUser.name || currentUser.email)) {
      setCurrentDataError(true);
    } else {
      setCurrentDataError(false);
    }
  }

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
  }, [currentUser]);

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__form-field">
            <label className="profile__label">Имя</label>
            <input className={`profile__input ${errors.name ? 'profile__input_red' : ''}`} name="name" disabled={props.isLoading} type="text"
              {...register('name', {
                required: 'Заполните это поле.',
                minLength: {
                  value: 2,
                  message: 'Текст должен быть не короче 2 символов.'
                },
                onChange: (e) => checkCurrentData(e)
              })}
            />
          </div>
          {errors.name && <span className={errorClassname('name')}>{errors.name.message}</span>}
          <div className="profile__form-field">
            <label className="profile__label">E-mail</label>
            <input className={`profile__input ${errors.email ? 'profile__input_red' : ''}`} name="email" disabled={props.isLoading} type="email"
              {...register('email', {
                required: 'Заполните это поле.',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Введите Email'
                }
              })}
            />
          </div>
          {errors.email && <span className={errorClassname('email')}>{errors.email.message}</span>}
          {currentDataError && <span className='profile__submit-info'>Указаны текущие данные. Необходимо их изменить</span>}
          {props.serverError && <span className="profile__submit-info">На сервере произошла ошибка...</span>}
          {props.successChangeProfile && <span className='profile__submit-info'>Данные успешно сохранены</span>}
          <button className={`profile__submit-btn button-opacity ${(isValid && !currentDataError && !props.successChangeProfile) ? '' : 'profile__submit-btn_disabled'}`} disabled={props.isLoading} type="submit">Редактировать</button>
        </form>
        <button className="profile__exit-btn button-opacity" type="button" onClick={handleExitBtn}>Выйти из&nbsp;аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
