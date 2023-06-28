import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  console.log(props.movie)
  const [isButtonActive, setIsButtonActive] = useState(false);

  function handleSaveMovie() {
    props.saveMovie(props.movie);
    return props.changeButton ? setIsButtonActive(!isButtonActive) : false;
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{props.movie.nameRU}</h2>
        <p className="moviesCard__duration">{props.movie.duration}</p>
      </div>
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <div className="moviesCard__image" style={{ backgroundImage: `url(https://api.nomoreparties.co/${props.movie.image.url}` }} ></div>
      </a>
      <button className={`moviesCard__button button-opacity ${isButtonActive && 'moviesCard__button_active'}`} type="button" onClick={handleSaveMovie}>{props.buttonText}</button>
    </li>
  );
}

export default MoviesCard;
