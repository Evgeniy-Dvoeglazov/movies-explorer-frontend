import './MoviesCard.css';

function MoviesCard(props) {
  const backgroundImage = props.isSavedMovie ? props.movie.image : `https://api.nomoreparties.co/${props.movie.image.url}`

  function handleClickBtn() {
    if(props.isSavedMovie || props.isSaved(props.movie)) {
      return props.onCardDelete(props.movie);
    }
    return props.saveMovie(props.movie);
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{props.movie.nameRU}</h2>
        <p className="moviesCard__duration">{props.movie.duration}</p>
      </div>
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <div className="moviesCard__image" style={{ backgroundImage: `url(${backgroundImage})` }} ></div>
      </a>
      <button className={`moviesCard__button button-opacity ${props.isSaved(props.movie) && 'moviesCard__button_active'}`} type="button" onClick={handleClickBtn}>{props.buttonText}</button>
    </li>
  );
}

export default MoviesCard;
