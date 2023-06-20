import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <button className="header__logo button-opacity" type="button" aria-label="Кнопка перехода на главную страницу">
        </button>
        <nav className="header__nav">
          <button className="header__button button-opacity" type="button">Регистрация</button>
          <button className="header__button header__button_green button-opacity" type="button">Войти</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
