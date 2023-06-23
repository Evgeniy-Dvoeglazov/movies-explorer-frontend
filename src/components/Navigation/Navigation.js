import './Navigation.css';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

function Navigation(props) {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  //Создаем эффект, который будет отслеживать ширину окна.
  //Далее мы сможем использовать это, чтобы дополнительный блок меню в шапке исчезал при увеличении ширины окна

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function openMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSigninBtn() {
    navigate('/signin');
  }

  function handleSignupBtn() {
    navigate('/signup');
  }

  function handleProfileBtn() {
    navigate('/profile', { replace: true });
    setIsMenuOpen(false);
    document.querySelector('.navigation__checkbox').checked = false;
  }

  return (
    !props.loggedIn
      ?
      <nav className="navigation">
        <button className="navigation__button button-opacity" type="button" onClick={handleSignupBtn}>Регистрация</button>
        <button className="navigation__button navigation__button_green button-opacity" type="button" onClick={handleSigninBtn}>Войти</button>
      </nav>
      :
      <>
        <div className={isMenuOpen ? "navigation__overlay" : "navigation"}>
          <nav className={(width < 1280 && isMenuOpen) ? "navigation__menu" : "navigation_isLogin"}>
            <ul className="navigation__items">
              <li className="navigation__item">
                <NavLink to="/" className={({ isActive }) => `navigation__link link-opacity ${isActive ? "navigation__link_active" : ""}`}>Главная</NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={({ isActive }) => `navigation__link link-opacity ${isActive ? "navigation__link_active" : ""}`}>Фильмы</NavLink>
              </li>
              <li>
                <NavLink to="/saved-movies" className={({ isActive }) => `navigation__link link-opacity ${isActive ? "navigation__link_active" : ""}`}>Сохраненные фильмы</NavLink>
              </li>
            </ul>
            <button className="navigation__account-button button-opacity" type="button" onClick={handleProfileBtn}>Аккаунт</button>
          </nav>
          <div className="navigation__hamburger">
            <input className="navigation__checkbox" type="checkbox" name="checkbox" onClick={openMenu} />
            <div className="navigation__hamburger-lines">
              <span className="navigation__line line1"></span>
              <span className="navigation__line line2"></span>
              <span className="navigation__line line3"></span>
            </div>
          </div>
        </div>
      </>
  );
}

export default Navigation;
