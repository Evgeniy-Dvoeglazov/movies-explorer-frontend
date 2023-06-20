import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  const [isButtonActive, setIsButtonActive] = useState(false);

  function switchButton() {
    setIsButtonActive(!isButtonActive);
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{props.movie.name}</h2>
        <p className="moviesCard__duration">{props.movie.duration}</p>
      </div>
      <div className="moviesCard__image" style={{ backgroundImage: `url(${props.movie.link}`}} ></div>
      <button className={`moviesCard__button ${isButtonActive &&'moviesCard__button_active'}`} type="submit" onClick={switchButton}>Сохранить</button>
    </li>
  );
}

export default MoviesCard;
