import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  const [isButtonActive, setIsButtonActive] = useState(false);

  function switchButton() {
    return props.changeButton ? setIsButtonActive(!isButtonActive) : false;
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{props.movie.name}</h2>
        <p className="moviesCard__duration">{props.movie.duration}</p>
      </div>
      <div className="moviesCard__image" style={{ backgroundImage: `url(${props.movie.link}`}} ></div>
      <button className={`moviesCard__button button-opacity ${isButtonActive && 'moviesCard__button_active'}`} type="submit" onClick={switchButton}>{props.buttonText}</button>
    </li>
  );
}

export default MoviesCard;
