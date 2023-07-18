import './Profile.css';
import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const [isCurrentDataError, setIsCurrentDataError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { register, formState: { errors, isValid }, getValues, setValue } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `profile__error ${errors[name] ? 'profile__error_visible' : ''}`;

  function handleExitBtn() {
    props.onSignOut();
    setIsCurrentDataError(false);
    setIsButtonDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: getValues('name'),
      email: getValues('email')
    });
  }

  function checkCurrentData(e) {
    props.changeVisibleError();
    if (e.target.value === currentUser.name || e.target.value === currentUser.email) {
      setIsCurrentDataError(true);
      setIsButtonDisabled(true);
    } else {
      setIsCurrentDataError(false);
      setIsButtonDisabled(false);
    }
  }

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (getValues('name') === currentUser.name || getValues('email') === currentUser.email) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, []);

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
                },
                onChange: (e) => checkCurrentData(e)
              })}
            />
          </div>
          {errors.email && <span className={errorClassname('email')}>{errors.email.message}</span>}
          {isCurrentDataError && <span className='profile__submit-info'>Указаны текущие данные. Необходимо их изменить</span>}
          {props.serverErrorProfile && <span className="profile__submit-info">На сервере произошла ошибка...</span>}
          {props.successChangeProfile && <span className='profile__submit-info'>Данные успешно сохранены</span>}
          <button className={`profile__submit-btn button-opacity ${(isValid && !props.successChangeProfile && !isButtonDisabled && !props.serverErrorProfile) ? '' : 'profile__submit-btn_disabled'}`} disabled={props.isLoading} type="submit">Редактировать</button>
        </form>
        <button className="profile__exit-btn button-opacity" type="button" onClick={handleExitBtn}>Выйти из&nbsp;аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
