import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from "react-router-dom";

function Header(props) {

  const navigate = useNavigate();

  function handleClickLogo() {
    navigate('/', { replace: true });
  }

  return (
    <header className={props.isMainPage ? "header_dark" : "header"}>
      <div className="header__container">
        <button className="logo button-opacity" type="button" aria-label="Кнопка перехода на главную страницу" onClick={handleClickLogo}>
        </button>
        <Navigation
          loggedIn={props.loggedIn}
        />
      </div>
    </header>
  );
}

export default Header;
