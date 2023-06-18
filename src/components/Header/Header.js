import './Header.css';
import logo from '../../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип проекта" />
        <nav className="header__nav">
          <button className="header__button" type="button">Регистрация</button>
          <button className="header__button header__button_green" type="button">Войти</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
