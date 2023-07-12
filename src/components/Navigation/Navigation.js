import './Navigation.css';
import { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

function Navigation(props) {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className={`navigation ${isMenuOpen ? "navigation__overlay" : ""}`}>
          <nav className={`navigation__isLogin ${(props.width < 767 && isMenuOpen) ? "navigation__menu" : ""}`}>
            <ul className="navigation__items">
              <li className="navigation__item">
                <NavLink to="/" className={({ isActive }) => `navigation__link link-opacity ${isActive ? "navigation__link_active" : ""}`}>Главная</NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={({ isActive }) => `navigation__link link-opacity ${isActive ? "navigation__link_active" : ""} ${props.isMainPage ? "navigation__link_whiteText" : "navigation__link_blackText"}`}>Фильмы</NavLink>
              </li>
              <li>
                <NavLink to="/saved-movies" className={({ isActive }) => `navigation__link link-opacity ${isActive ? "navigation__link_active" : ""} ${props.isMainPage ? "navigation__link_whiteText" : "navigation__link_blackText"}`}>Сохраненные фильмы</NavLink>
              </li>
            </ul>
            <button className="navigation__account-button button-opacity" type="button" onClick={handleProfileBtn}>Аккаунт</button>
          </nav>
          <div className="navigation__hamburger">
            <input className="navigation__checkbox" type="checkbox" name="checkbox" onClick={openMenu} />
            <div className="navigation__hamburger-lines">
              <span className={`navigation__line line1 ${(isMenuOpen || !props.isMainPage) ? "navigation__line_blackColor" : "navigation__line_whiteColor"}`}></span>
              <span className={`navigation__line line2 ${(isMenuOpen || !props.isMainPage) ? "navigation__line_blackColor" : "navigation__line_whiteColor"}`}></span>
              <span className={`navigation__line line3 ${(isMenuOpen || !props.isMainPage) ? "navigation__line_blackColor" : "navigation__line_whiteColor"}`}></span>
            </div>
          </div>
        </div>
        <div>
        </div>
      </>
  );
}

export default Navigation;
